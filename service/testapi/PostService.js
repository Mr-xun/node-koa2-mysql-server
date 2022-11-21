/*
 * @Author: xunxiao
 * @Date: 2022-11-09 11:29:33
 * @LastEditors: xunxiao
 * @LastEditTime: 2022-11-18 16:29:50
 * @Description: 
 */

import testApiModel from "@root/models/testapi";
const PostModel = testApiModel.Post;
const TagModel = testApiModel.Tag;

//用户创建
const postCreate = async (data) => {
    console.log(data,7878787)
    let newPost = await PostModel.create({name: data.name}); //返回创建的post对象
    let tags = await TagModel.findAll({where: {id: data['tagIds']}})//找到对应的tagId对象
    console.log(newPost,'newPost')
    console.log(tags,'tags')
    await newPost.setTags(tags) //通过setTags方法在postTag表添加记录   
    return true
};

//获取所有角色
const GetAll = (where) => {
    return PostModel.findAll(
        {
            include: [
                {model: TagModel, attributes: ['id', 'name']}
            ]
        }
    );
};
export default {
    postCreate,
    GetAll
};
