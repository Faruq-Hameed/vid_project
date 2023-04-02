const isItemAlreadyExists = async (model, param)=>{
const item = await model.findOne({param});
   if (item){
    return true;
   }

}

module.exports = isItemAlreadyExists
