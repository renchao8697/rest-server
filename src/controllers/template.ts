import { model } from 'mongoose'
import { Request, Response } from 'express'

import { templateSchema } from '../models/template'

const Template = model('Template', templateSchema)

export class TemplateController {
  public addNewTemplate (req:Request, res: Response) {
    let newTemplate = new Template(req.body);
    newTemplate.save().then(template => {
      res.json({code: 0, value: template});
    }).catch(err => {
      res.send(err);
    })
  }

  public async getTemplates (req: Request, res: Response) {
    let { page = 1, pageSize = 5, tempName = '', tempType = '' } : any = req.query;
    tempType = tempType === '' ? [1, 2, 3] : [tempType];

    try {
      let total = await Template.find({tempName: new RegExp(tempName), tempType: {$in:[...tempType]}}).count();
      let result = await Template.find({tempName: new RegExp(tempName), tempType: {$in:[...tempType]}}).limit(pageSize - 0).skip((page - 1) * pageSize);

      res.json({code: 0, value: result, total})
    } catch (err) {
      res.send(err);
    }
  }

  public getTemplateWithID (req: Request, res: Response) {
    Template.findById(req.params.templateId).then(template => {
      res.json({code: 0, value: template});
    }).catch(err => {
      res.send(err);
    })
  }

  public updateTemplate (req: Request, res: Response) {
    Template.findOneAndUpdate({ _id: req.params.templateId }, req.body, { new: true }).then(template => {
      res.json({code: 0, value: template})
    }).catch(err => {
      res.send(err);
    })
  }

  public deleteTemplate (req: Request, res: Response) {
    Template.findOneAndDelete({ _id: req.params.templateId }).then(template => {
      res.json({code: 0, message: 'successfully deleted template!' });
    }).catch(err => {
      res.send(err);
    })
  }
}