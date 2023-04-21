module.exports = {
    async create(ctx) {
      // Your custom logic here
      const { request, response } = ctx;
      const data = request.body;

      // Log the object
      console.log(data);

      // Return response
      response.status = 200;
      response.body = { message: 'Object logged successfully' };
    }
  };
