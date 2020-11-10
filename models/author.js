var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
//if operator to check if years were not inputted in which case virtual property must be adjusted to avoid undefined 
AuthorSchema
.virtual('lifespan')
.get(function () {
  if(this.date_of_death == undefined || this.date_of_birth == undefined){
     return " "
  }
  return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString(); 
});
 
//apply luxon to beautify dates, ternary to handle cases where there is no date and sub in blank string, creating virtual 
AuthorSchema
.virtual('birth_formatted')
.get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
}); 

//apply luxon to beautify dates, ternary to handle cases where there is no date and sub in blank string, creating virtual 
AuthorSchema
.virtual('death_formatted')
.get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
}); 

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);

