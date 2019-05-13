Blockly.Blocks['speech_to_text_result'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("speech")
        .appendField(new Blockly.FieldVariable("azure"), "azure")
        .appendField("recognize result");
    this.setOutput(true, "String");
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['speech_to_text_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("speech language")
        .appendField(new Blockly.FieldDropdown([["Chinese","zh-CN"], ["English","en-US"], ["Japanese","ja-JP"], ["Russian","ru-RU"]]), "language")
        .appendField("server")
        .appendField(new Blockly.FieldDropdown([["eastasia","eastasia"]]), "server");
    this.setOutput(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['speech_to_text_recognize'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("speech")
        .appendField(new Blockly.FieldVariable("azure"), "azure")
        .appendField("recognize until")
        .appendField(new Blockly.FieldTextInput("5"), "timeout")
        .appendField("seconds");
    this.appendStatementInput("include")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['speech_to_text_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("speech")
        .appendField(new Blockly.FieldVariable("azure"), "azure")
        .appendField("recognize")
        .appendField(new Blockly.FieldDropdown([["start","start"], ["clear","clear"], ["stop","stop"]]), "function");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};