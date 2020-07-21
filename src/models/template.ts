import { Schema } from 'mongoose'

export const templateSchema = new Schema({
  tempName: {
    type: String,
    required: 'template name is required'
  },
  tempType: {
    type: Number,
    required: 'template type is required'
  },
  pageName: {
    type: String,
    required: 'page name is required'
  },
  tempContent: {
    type: String,
    required: 'template content is required'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})
