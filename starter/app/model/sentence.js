import Sequelize, { Model } from 'sequelize';
import sequelize from '../lib/db';
import { config } from 'lin-mizar';

class Sentence extends Model {

}
Sentence.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: Sequelize.STRING(64),
      get () {
        const image = this.getDataValue('image')
        return config.getItem('localMainImgUrlPrefix') + image
      }
    },
    content: {
      type: Sequelize.STRING(300),
      allowNull: true
    },

    pubdate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    fav_nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    type: {
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING(50)
    },
    status: {
      type: Sequelize.INTEGER
    }
  },
  {
    tableName: 'sentence',
    modelName: 'sentence',
    paranoid: true,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    sequelize
  }
)

export { Sentence as SentenceModel }
