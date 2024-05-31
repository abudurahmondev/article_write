import PostModel from '../model/Post.js'

export const getLastTags = async (req,res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Maqola topilmadi'
        })
    }
}

export const getAll = async (req,res) => {
    try {
        const posts = await PostModel.find().populate({path: 'user',  select: ["name", "avatar"] }).exec()

        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Maqola topilmadi'
        })
    }
}


export const getOne = async (req,res) => {
   try {
        const postId = req.params.id
        PostModel.findOneAndUpdate(
            {_id: postId, },

            {$inc: { viewsCount: 1 },},

            {returnDocument: 'after',},

            (err, doc) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        message: "Не удалось вернуть статью"
                    })
                }

                if(!doc) {
                    return res.status(404).json({
                        message: "Статья не найдена"
                    })
                }

                res.json(doc)
            }
        ).populate('user')
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Maqolani topa olmadim'
        })
    }
}


export const remove = async (req,res) => {
   try {
        const postId = req.params.id
        
        PostModel.findByIdAndDelete(
        {
            _id: postId,
        }, 
        (err, doc) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message: "Maqolani ochira olmadim"
                })    
            }

            
            if(!doc) {
                return res.status(404).json({
                    message: "Статья не найдена"
                })
            }

            res.json({
                success: true,
            })
        }
    )

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Maqolani topa olmadim'
        })
    }
}


export const create = async (req,res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        })

        const post = await doc.save()
        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Maqola qosha olmadim'
        })
    }
}


export const update = async (req,res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            }
        )

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Maqola yagilay olmadim'
        })
    }
}