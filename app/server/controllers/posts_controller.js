const { Post, User, Upvote } = require("../models/index");
const { filterParams, currentUserId, handleError, authenticateUser } = require("./application_controller");

const createPost = async (req, res) => {
  if (!authenticateUser(req, res)) {
    return;
  }

  const post = Post.build({ ...postParams(req), UserId: currentUserId(req) });
  await post.slugfy();

  await post.save()
    .then((data) => {
      res.status(200).send(data.getData());
    })
    .catch((error) => {
      handleError(error, res);
    });
};

const getPost = async (req, res) => {
  const post = await setPost(req.params);
  if (post === null) {
    res.status(404).send({ error: "cant find this post" });
    return;
  }
  res.status(200).send(post.getData());
};

const getPosts = async (req, res) => {
  const cursor = req.query.cursor || 0;
  const limit = req.query.limit || 10;

  const posts = await Post.findAll({ offset: cursor, limit, ...Post.ranked(User, Upvote) });
  res.status(200).send(posts.map((p) => p.getData()));
};

const updatePost = async (req, res) => {
  const post = await setPost(req.params);
  if (post === null) {
    res.status(404).send({ error: "cant find this post" });
    return;
  }

  if (!authenticateUser(req, res)) {
    return;
  }

  if (post.UserId !== currentUserId(req)) {
    res.status(401).send({ error: "you dont have permission to edit this post" });
  } else {
    post.set(postParams(req));
    await post.save()
      .then((data) => {
        res.status(200).send(data.getData());
      })
      .catch((error) => {
        handleError(error, res);
      });
  }
};

const deletePost = async (req, res) => {
  const post = await setPost(req.params);
  if (post === null) {
    res.status(404).send({ error: "cant find this post" });
    return;
  }

  if (!authenticateUser(req, res)) {
    return;
  }

  if (post.UserId !== currentUserId(req)) {
    res.status(401).send({ error: "you dont have permission to delete this post" });
  } else {
    if (post.Upvotes.length > 0) {
      const upvotesIds = post.Upvotes.map((up) => up.id);
      await Upvote.destroy({ where: { id: upvotesIds } })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "unexpected error" });
        });
    }
    await Post.destroy({ where: { id: post.id } })
      .then(() => {
        res.status(200).send({ message: "post deleted" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ error: "unexpected error" });
      });
  }
};

const upvotePost = async (req, res) => {
  if (!authenticateUser(req, res)) {
    return;
  }

  const post = await setPost(req.params);
  if (post === null) {
    res.status(404).send({ error: "cant find this post" });
    return;
  }

  const upvote = await Upvote.findOne({ where: { UserId: currentUserId(req), PostId: post.id } });
  if (upvote) {
    await Upvote.destroy({ where: { id: upvote.id } });
    post.set({ upvotesCount: post.upvotesCount - 1 });
    await post.save();
    res.status(200).send({ message: "upvoted removed" });
  } else {
    Upvote.create({ UserId: currentUserId(req), PostId: post.id });
    post.set({ upvotesCount: post.upvotesCount + 1 });
    await post.save();
    res.status(200).send({ message: "upvoted added" });
  }
};

// helpers ///////////////////////////////////////////

const setPost = async (params) => {

  let post = await Post.findByPk(params.id, Post.fullScope(User, Upvote))
    .catch(() => {});
  if (!post) {
    post = await Post.findOne({where: {slug: params.id}});
  }

  return post;
};

// strong parameters
const postParams = (req) => {
  const permittedParams = [
    "title",
    "content"
  ];
  return filterParams(permittedParams, req);
};

module.exports = { createPost, getPost, updatePost, deletePost, getPosts, upvotePost };
