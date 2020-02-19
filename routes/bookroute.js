var express     = require('express');
var bookModel   = require('../models/books').books;
var discountModel = require('../models/books').discounts;
var bookdiscountedModel = require('../models/books').booksDiscounts;

var router = express.Router();

router.post('/addbook',(req,res)=>{
       var book = new bookModel({
           isbn:req.body.isbn,
           title:req.body.title,
           edition:req.body.edition,
           author:req.body.author,
           publisher:req.bodypublisher,
           price:req.body.price
       });
       book.save((err,bookData)=>{
                if(err){
                    res.json({msg:'error in saving book data',bookdata:bookData});
                }else{
                    //check if we give discount on book
                    if(!req.body.discount){
                        res.json({msg:'book saved without discount'});
                    }else{
                        var bookdiscounted = new bookdiscountedModel({
                             book_id:bookData._id,
                             discount_id:req.body.discount
                        }); 
                        bookdiscounted.save((err,bookdiscData)=>{
                            if(err){
                                res.json({msg:'error in saving book with discount'});
                            }else{
                                res.json({msg:'book saved with discount',bookdata:bookData,bookdisc:bookdiscData})
                            }
                        });
                    }
                }
       });
});

router.post('/adddiscount',(req,res)=>{
        var discount = new discountModel({
              name:req.body.name,
              value:req.body.value
        });
        discount.save((err,discData)=>{
                if(err){
                    res.json({msg:'error in saving discount'});
                }else{
                    res.json({msg:'discount data saved',discdata:discData});
                }
        });
});

router.get('/showallbooks',(req,res)=>{
       bookModel.aggregate([
            {
                $lookup:{
                    from:'booksdiscounts',
                    localField:'_id',
                    foreignField:'book_id',
                    as:'bookdiscs'
                }
            },{
                $lookup:{
                    from:'discounts',
                    localField:'bookdiscs.discount_id',
                    foreignField:'_id',
                    as:'discdata'
                }
            }
       ],(err,bookData)=>{
            if(err){
                res.json({msg:'error in fetching booksdata'});
            }else{
                res.json({msg:'fetch the book data',bookdata:bookData});
            }
       });
});

module.exports = router;