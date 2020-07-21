import { Application } from 'express'

import { TemplateController } from '../controllers/template'

export class Routes {
  public templateController = new TemplateController()

  public intallRoute(app: Application): void {
    app.route('/template')
      .get(this.templateController.getTemplates)
      .post(this.templateController.addNewTemplate);

    app.route('/template/:templateId')
      .get(this.templateController.getTemplateWithID)
      .put(this.templateController.updateTemplate)
      .delete(this.templateController.deleteTemplate);
  }
}