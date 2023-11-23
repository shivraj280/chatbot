it('should check ngShow', function() {
    var checkbox = element(by.model('checked'));
    var checkElem = element(by.css('.check-element'));
  
    expect(checkElem.isDisplayed()).toBe(false);
    checkbox.click();
    expect(checkElem.isDisplayed()).toBe(true);
  });
  
  /*
  Copyright 2021 Google LLC. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license
  */