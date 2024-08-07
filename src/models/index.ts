import { Category } from './Category';
import { Course } from './Course';
import { Episode } from './Episode';
import { Favorite } from './Favorite';
import { User } from './User';
import { Like } from './Like';
import { WatchTime } from './WatchTime';

// Configuração das associações
Category.hasMany(Course, { foreignKey: 'categoryId', as: 'courses' });
Course.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Course.hasMany(Episode, { foreignKey: 'courseId' });
Episode.belongsTo(Course, { foreignKey: 'courseId' });

Course.belongsToMany(User, { through: Favorite, as: 'favorites' });
User.belongsToMany(Course, { through: Favorite, as: 'favoriteCourses' });

Course.belongsToMany(User, { through: Like, as: 'likes' });
User.belongsToMany(Course, { through: Like, as: 'likedCourses' });

Episode.belongsToMany(User, { through: WatchTime, as: 'watchTimes' });
User.belongsToMany(Episode, { through: WatchTime, as: 'watchedEpisodes' });

Favorite.belongsTo(Course, { foreignKey: 'courseId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

WatchTime.belongsTo(Episode, { foreignKey: 'episodeId' });
WatchTime.belongsTo(User, { foreignKey: 'userId' });

export {
  Category,
  Course,
  Episode,
  Favorite,
  User,
  Like,
  WatchTime
};
