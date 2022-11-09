/*
 * @Author: xunxiao
 * @Date: 2022-11-09 11:25:08
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-09 13:10:56
 * @Description:
 */
import Sequelize from "sequelize";
import DB from "@root/db";
const Tag = DB.sequelize.define(
    "tag",
    {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);
const Post = DB.sequelize.define(
    "post",
    {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    }
);
const PostTag = DB.sequelize.define(
    "postTag",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        postId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "postTag",
        },
        tagId: {
            type: Sequelize.INTEGER,
            unique: "postTag",
            allowNull: false,
            references: null,
        },
    },
    {
        freezeTableName: true,
    }
);

Post.belongsToMany(Tag, {
    through: {
        model: PostTag,
        unique: false,
    },
    foreignKey: "postId", //通过外键postId
    constraints: false,
});
Tag.belongsToMany(Post, {
    through: {
        model: PostTag,
        unique: false,
    },
    foreignKey: "tagId", //通过外键tagId
    constraints: false,
});
Post.sync();

Tag.sync();

PostTag.sync();
export default {
    Post,
    Tag,
    PostTag,
};
