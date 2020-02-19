var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    isbn:{
        type:String
    },
    title:{
        type:String
    },
    edition:{
        type:String
    },
    author:{
        type:String
    },
    publisher:{
        type:String
    },
    price:{
        type:Number
    }
});

var books = mongoose.model('books',bookSchema);

var discountSchema = new mongoose.Schema({
    name:{
        type:String
    },
    value:{
        type:Number
    }
});

var discounts = mongoose.model('discounts',discountSchema);

var booksdiscountedSchema = new mongoose.Schema({
    book_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'books'
    },
    discount_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'discounts'
    }
});

var booksDiscounts = mongoose.model('booksdiscounts',booksdiscountedSchema);

module.exports={
    books,
    discounts,
    booksDiscounts
}