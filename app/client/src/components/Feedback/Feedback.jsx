const typeClasses = {
  info: 'flex bg-blue-100 rounded-lg py-2 p-3 text-sm text-blue-700',
  danger: 'flex bg-red-100 rounded-lg py-2 p-3 text-sm text-red-700',
  success: 'flex bg-green-100 rounded-lg py-2 p-3 text-sm text-green-700',
  warning: 'flex bg-yellow-100 rounded-lg py-2 p-3 text-sm text-yellow-700'
};

const Feedback = ({ bool, message, type = 'info' }) =>
  !bool || <div className={typeClasses[type]} role='alert'>{message}</div>
export default Feedback;
