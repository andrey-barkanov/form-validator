function validateForm(selector) {
  var items = $(selector).find("[data-validation]");
  var errors = [];
  var success = true;

  for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var ruleString = $(item).attr("data-validation");

      if (ruleString == "") {
        continue;
      }

      var rules = ruleString.split(",");

      // First validation item is always name.
      var name = rules[0];

      for (var j = 1; j < rules.length; j++) {
          var rule = rules[j];

          switch (rule) {
              case "not-empty": {
                  if ($(item).val() == "") {
                      success = false;
                      errors.push({ name: name, message: "значение не может быть пустой строкой." });
                  }
                  break;
              }
              case "not-zero": {
                  if ($(item).val() == "0") {
                      success = false;
                      errors.push({ name: name, message: "значение не может быть нулем." });
                  }
                  break;
              }
              case "integer": {
                var regexp = /^[\d.]+$/g;
                var value = $(item).val();
                if (value != "" && regexp.test(value) == false) {
                  success = false;
                  errors.push({ name: name, message: "значение должно быть целым числом без пробелов и специальных знаков." });
                }
                break;
              }
          }
      }
  }

  return errors;
}
