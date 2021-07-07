module.exports = {
  'check validation if no field is filled on settings page': function (browser) {
    browser
      .url('http://localhost:8081/settings')
      .waitForElementVisible('body')
      .assert.titleContains('School CI')
      .click('button[id=submit]')
      .assert.containsText('#err-submit', 'Required fields are empty')
      .end();
  },

  // проверка, что заведомо он склонируется успешно
  'clone repo volkov97/svdom, check for success using a block #scs-save': function (browser) {
    browser
      .url('http://localhost:8081/settings')
      .waitForElementVisible('body')
      .setValue('input[name=repoName]', 'volkov97/svdom')
      .setValue('input[name=buildCommand]', 'npm run build')
      .setValue('input[name=time]', '30')
      .click('button[id=submit]')
      .waitForElementVisible('button[id=submit]')
      .assert.containsText('#scs-save', 'Success')
      .end();
  },
};
