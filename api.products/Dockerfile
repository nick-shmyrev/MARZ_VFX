# pull official base image
FROM node:17-alpine3.12

# set working directory
WORKDIR /api.products

# add `/app/node_modules/.bin` to $PATH
ENV PATH /api.products/node_modules/.bin:$PATH

# add app
COPY . ./

EXPOSE 5002

# start app
CMD ["npm", "run", "start"]