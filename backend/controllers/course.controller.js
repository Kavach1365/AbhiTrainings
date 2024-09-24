import { Course, Module, Video, Review } from '../models/course.model.js';

export const createCourseWithDetails = async (req, res) => {
  try {
    // Create Course
    const newCourse = new Course({
      ...req.body.courseInfo,
      pricingInfo: req.body.pricingInfo,
    });
    const savedCourse = await newCourse.save();

    // Create Modules and Store Videos
    const modulePromises = req.body.courseMaterials.map(async (module) => {
      const videos = await Promise.all(module.videosList.map(async (video) => {
        const newVideo = new Video(video);
        return await newVideo.save();
      }));
      
      const newModule = new Module({ ...module, videosList: videos.map(video => video._id) });
      const savedModule = await newModule.save();
      
      await Course.findByIdAndUpdate(savedCourse._id, { $push: { modules: savedModule._id } });

      return savedModule;
    });

    await Promise.all(modulePromises);

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate({
      path: 'modules',
      populate: {
        path: 'videosList',
      },
    });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const courseReview = async (req, res) => {
  const { user, courseId, rating, review } = req.body;

  try {
    const userId = user._id;

    const existingReview = await Review.findOne({ user: userId, course: courseId });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already submitted a review for this course.' });

    }

    // Create a new review if no existing review is found
    const newReview = new Review({
      user: userId,
      course: courseId,
      rating,
      review,
    });

    await newReview.save();

    await Course.findByIdAndUpdate(courseId, {
      $push: { reviews: newReview._id },
    });

    res.status(201).json({ message: 'Review created successfully!', review: newReview });
  } catch (error) {
    // console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
};




export const getCourseReviews = async (req, res) => {
  const { courseId } = req.params;  
  // console.log(`Fetching reviews for course ID: ${courseId}`);

  try {
    // Fetch reviews for the course and populate user details
    const reviews = await Review.find({ course: courseId })
      .populate('user', 'username profileImg') 
      .exec();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this course' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    // console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

//Not required but dont remove
// export const getModulesByCourseId = async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const modules = await Module.find({ course: courseId }).populate('videosList');
//     if (!modules) {
//       return res.status(404).json({ error: 'Modules not found' });
//     }
//     res.json(modules);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };