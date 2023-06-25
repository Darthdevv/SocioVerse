import User from "../models/User.js";
import Post from "../models/Posts.js";



// CREATE :
export const createPost = async (res, req) => {
  try{
    const { userId, description, picturePath } = req.body;
    const user = User.findById(userId);
    const newPost = new Post({
      userId,
      description, 
      picturePath, 
      firstName: user.firstName ,
      lastname: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
        res.status(409).json({ message: err.message });
  }
}

// READ :
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
export const getFeedPosts = async (req, res) => {
  try {
      const post = await Post.find();
      res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// UPDATE :
export const likePost = async (req, res) => {
  try {
    const { id } = req.param;
    const { userid } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userid);
    if (isLiked) {
      post.likes.delete(userid);
    } else {
      post.likes.set(userid, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};