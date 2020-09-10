const fs = require('fs');
const dataObjects = require('../DATA/data-objects.json').dataObjects;

function createGlobalFiles(templateJson) {
  const globalTemplates = templateJson.templates.global;
  for (let t = 0; t < globalTemplates.length; t++) {
    const template = globalTemplates[t];
    const target = `./../DATA/${template}`;
    if (!fs.existsSync(target)) {
      const templateFile = `./../templates/${template}`;
      const templateJson = require(templateFile);
      fs.writeFileSync(target, JSON.stringify(templateJson, null, 2));
      console.log(`${target} created`);
    }
  }
}

for (let i = 0; i < dataObjects.length; i++) {
  const dataObject = dataObjects[i];

  const name = dataObject.name.trim().replace(/ /g, '-');

  const typeTemplates = dataObject.type;
  for (let x = 0; x < typeTemplates.length; x++) {
    const type = typeTemplates[x];
    const target = `./../DATA/${type}-${name}.json`;
    if (!fs.existsSync(target)) {
      const templateFile = `./../templates/${type}-data-object.json`;
      const templateJson = require(templateFile);
      createGlobalFiles(templateJson);
      templateJson.name = dataObject.name;
      fs.writeFileSync(target, JSON.stringify(templateJson, null, 2));
      console.log(`${target} created`);
    }
  }
}
