const handleCreatePost = (req, res, db, moment) => {
    const currentUserID = req.params.id;
    const { postText } = req.body;
    
    const dateStr = moment().format('ddd M/D/YY h:mma')
    console.log(dateStr)
    db.transaction(tx => {
        tx('posts')
            .returning("*")
            .insert({
                post: postText,
                created: dateStr
            })
            .then(data => {
                return tx('users')
                    .where({id: currentUserID})
                    .update({comments: tx.raw('array_append(comments, ?)', [data[0].id])})
                    .returning("*")
                    .then(updatedUser => {
                        return updatedUser[0]
                    })
                    .then(user => {
                        tx('posts')
                            .returning('*')
                            .whereIn('id', [...user.comments])
                            .then(posts => {
                                console.log(posts)
                                const info = {
                                    updatedUser: user,
                                    postArray: posts
                                }
                                res.json(info);
                            })
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(err => res.status(400).json("unable to create new post"))  
}

const handleGetPosts = (req, res, db) => {
    const { userID } = req.params;
    db.transaction(tx => {
        tx('users')
            .where({id: userID})
            .returning('*')
            .then(data =>{
                const commentIDs = data[0].comments;
                return tx('posts')
                    .returning('*')
                    .whereIn('id', commentIDs)
                    .then(data => {
                        const newSort = data.sort(function(a, b) { 
                            return a.id - b.id;
                        });
                        res.json(newSort)
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(err => console.log(err))
}

const handleUpdatePost = (req, res, db, moment) => {
    const {text, userID} = req.body;
    const {postID} = req.params;
    const dateStr = moment().format('ddd M/D/YY h:mma')
    db.transaction(tx => {
        tx('posts')
            .where({id: postID})
            .update({post: text,
                    modified: true,
                    created: dateStr
            })
            .returning("*")
            .then(updatedPost => {
                return tx('users')
                    .where({id: userID})
                    .returning("*")
                    .then(foundUser => {
                        const commentIDs = foundUser[0].comments;
                        return tx("posts")
                            .returning("*")
                            .whereIn('id', commentIDs)
                            .then(commentArray => {
                                const newSort = commentArray.sort(function(a, b) { 
                                    return a.id - b.id;
                                });
                                res.json(newSort)
                            })
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(error => res.status(400).json("unable to update post"))
}

const handleDeletePost = (req, res, db) => {
    const { postID, userID } = req.params;
    const { currentUser, postData } = req.body;
    const updatedCommentsArray = currentUser.comments.filter(post => post !== postID)
    db.transaction(tx => {
        tx('posts')
            .where({id: postID})
            .del()
            .then(deletedPost => {
               return tx('users')
                    .where({id: userID})
                    .update({comments: updatedCommentsArray})
                    .returning("*")
                    .then(user => {
                        const commentIDs = user[0].comments;
                        return tx('posts')
                            .returning('*')
                            .whereIn('id', [...commentIDs])
                            .then(comments => {
                                const newSort = comments.sort(function(a, b) { 
                                    return a.id - b.id;
                                });
                                res.json({comments: newSort, updatedUser: user[0]})
                            })
                    })
            })    
            .then(tx.commit)
            .catch(tx.rollback)
           
    })
    .catch(error => console.log(error))
}

module.exports = {
    handleCreatePost: handleCreatePost,
    handleGetPosts: handleGetPosts,
    handleUpdatePost: handleUpdatePost,
    handleDeletePost: handleDeletePost
}