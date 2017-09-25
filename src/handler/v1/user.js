module.exports.new = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'x-custom-header': 'My Header Value',
    },
    body: { test: 'test' },
  };

  callback(null, response);
};
