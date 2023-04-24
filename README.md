# StableAPI
This app interfaces with the Stability API and generates a comic book panel based on a user text prompt.

## Libraries / API's
This project uses the following technolgies:
* Express
* Stability api
* Cloudinary
* MongoDB

## Setup
To run this project, clone the repo and then:

```
$ cd ../repofolder
$ npm start
```
### API quick test
Load  up **localhost:8081** in a browser, a greeting should displayed in the developer console.

### Invoke the API without a client
You can manually format a request to the API with the following URL structure:

**localhost:8081:/"string1"/"string2"/"string3"/"string4"**

## Features
* Uses express to create a simple rest api
* Uses cloudinary to save the generated image
* Uses mongoDB to store the image URL and text data

## To do
* Add retrieval methods to generate catalogue views from all the stored comics in mongoDB
* Enhance the text prompt to generate more consistent images
* Look into Dreambooth api

--

Contact:
lechwojas@gmail.com


