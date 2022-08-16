const { Post } = require('../models/index')
const { filterParams, currentUserId, handleError, authenticateUser } = require('./application_controller')

const createPost = async (req, res) => {
  if (!authenticateUser(req, res)) {
    return
  }

  const post = Post.build({ ...postParams(req), UserId: currentUserId(req) })
  await post.save()
    .then((data) => {
      res.status(200).send(data.getData())
    })
    .catch((error) => {
      handleError(error, res)
    })
}

const getPost = async (req, res) => {
  const post = await setPost(req.params)
  if (post === null) {
    res.status(404).send({ error: 'cant find this post' })
    return
  }
  res.status(200).send(post.getData())
}

const updatePost = async (req, res) => {
  const post = await setPost(req.params)
  if (post === null) {
    res.status(404).send({ error: 'cant find this post' })
    return
  }

  if (!authenticateUser(req, res)) {
    return
  }

  if (post.UserId !== currentUserId(req)) {
    res.status(401).send({ error: 'you dont have permission to edit this post' })
  } else {
    post.set(postParams(req))
    await post.save()
      .then((data) => {
        res.status(200).send(data.getData())
      })
      .catch((error) => {
        handleError(error, res)
      })
  }
}

const deletePost = async (req, res) => {
  const post = await setPost(req.params)
  if (post === null) {
    res.status(404).send({ error: 'cant find this post' })
    return
  }

  if (!authenticateUser(req, res)) {
    return
  }

  if (post.UserId !== currentUserId(req)) {
    res.status(401).send({ error: 'you dont have permission to delete this post' })
  } else {
    await Post.destroy({ where: { id: post.id } })
      .then(() => {
        res.status(200).send({ message: 'post deleted' })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send({ error: 'unexpected error' })
      })
  }
}

// helpers ///////////////////////////////////////////

const setPost = async (params) => {
  const post = await Post.findByPk(params.id, { include: [Post.User] })
  return post
}

// strong parameters
const postParams = (req) => {
  const permittedParams = [
    'title',
    'content'
  ]
  return filterParams(permittedParams, req)
}

module.exports = { createPost, getPost, updatePost, deletePost }
