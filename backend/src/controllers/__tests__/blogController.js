// Import functions to test:
const { createBlogs, getBlogs } = require("../blogController");

const { mockReq } = require("../../../__mocks__/data");
const { __mocks__ } = require("../../models/__mocks__/Blog.mock");

jest.mock("../../models/Blog");
const { Blog } = require("../../models/Blog");

jest.mock("../../services/google-cloud-storage");
const { uploadToGoogleCloudStorage } = require("../../services/google-cloud-storage");


describe("Testing the blogController", () => {
  let thisReq, thisRes;

  beforeEach(() => {
    // Update test responses
    thisReq = mockReq; // Mock request from mocks folder
    thisRes = {
      status: jest.fn(),
      json: jest.fn(),
    };

    uploadToGoogleCloudStorage.mockResolvedValue("https://storage.cloud.google.com/ix-blog-app-bs/dinologo.jpeg?authuser=1");

    Blog.mockClear();
    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
  });


  test ("That the createBlogs function creates a blog with a valid payload", async () => {
    __mocks__.mockPopulate.mockResolvedValue(mockReq);
    __mocks__.mockSave.mockResolvedValue(mockReq);
    await createBlogs(thisReq, thisRes);
    expect(Blog.findById).toHaveBeenCalledWith(mockReq._id);
    expect(thisRes.status).toHaveBeenCalledWith(201);
    expect(thisRes.json).toHaveBeenCalledWith({ message: "Created blog!", data: thisReq.body });
  });

  test ("The createBlog function throws an error when payload is not valid", () => {

  });
});