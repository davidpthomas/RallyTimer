// TODO
// - single start/stop button; toggle display in startStop method

var navigate = function(panel, direction) {
  var layout = panel.getLayout();
  layout[direction]();
};

// Timer Panel {{{
var timerPanel = Ext.create('Ext.panel.Panel', {
  id: 'timerPanel',
  items: [
    { xtype: 'component', id: 'display', componentCls: 'digits', html: '25:00' },
    { xtype: 'component', id: 'warning', hidden: true, html: "don't do it!" }
  ],
  bbar: [
    {
      id: 'startButton', type: 'button', text: 'Start', flex: 1,
      hidden: false,
      disabled: false,
      handler: function(btn, e) {
        Ext.getCmp("startButton").hide().disable();
        Ext.getCmp("settingsButton").hide().disable();
        Ext.getCmp("interruptButton").enable().show();
        Timer.start(25, function(msRemaining) {
          var minRemaining = Math.floor(msRemaining / (1000 * 60));
          var secRemaining = Math.floor((msRemaining - (minRemaining * 60 * 1000)) / 1000);
          Ext.getCmp("display").update(minRemaining + ":" + secRemaining);
        });
      }
    },
    {
      id: 'interruptButton', type: 'button', text: 'Interrupted', flex: 1,
      hidden: true,
      disabled: true,
      listeners: {
        click: function(btn, e) {
          Timer.interrupt();
          Ext.getCmp("interruptButton").hide().disable();
          Ext.getCmp("resumeButton").enable().show();
        },
        mouseout: function(btn, e) {
          this.listenForInterrupt = true;
        },
        mouseover: function(btn, e) {
          if(this.listenForInterrupt) {
            console.log("mouseover");
          }
        }
      }

    },
    {
      id: 'resumeButton', type: 'button', text: 'Resume', flex: 1,
      hidden: true,
      disabled: true,
      handler: function(btn, e) {
        Timer.resume();
        Ext.getCmp("resumeButton").hide().disable();
        Ext.getCmp("interruptButton").enable().show();
      }
    },
    {
      id: 'settingsButton', type: 'button', text: 'Settings', flex: 0,
      handler: function(btn, e) {
        navigate(btn.up("#appPanel"), "next");
      }
    }
  ]
}); // }}}

// Settings Panel {{{
var settingsPanel = Ext.create('Ext.panel.Panel', {
  id: 'settingsPanel',
  html: 'settings panel',
  bbar: [
    { 
      id: 'save', type: 'button', text: 'Save', flex: 1,
      handler: function(btn, e) {
        console.log(btn, e);
      }
    },
    { 
      id: 'cancel', type: 'button', text: 'Cancel', flex: 1,
      handler: function(btn, e) {
        navigate(btn.up("#appPanel"), "prev");
      }
    }

  ]
}); // }}}

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items: [
      {
        id: 'appPanel',
        layout: 'card',
        height: 150,
        defaults: { border: false },
        items: [ timerPanel, settingsPanel ],
      }
    ],
    launch: function() {
    },
    _updateTimeDisplay: function(msRemaining) {
      var minRemaining = msRemaining / (1000 * 60);
      var secRemaining = (msRemaining - minRemaining * 60 * 1000) / 60;
      secRemaining = (secRemaining < 10) ? "0" + secRemaining : secRemaining;
      Ext.getCmp("display").update(minRemaining + ":" + secRemaining);
    }
});

