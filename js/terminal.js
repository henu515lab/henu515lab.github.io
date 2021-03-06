window.onload = function () {
  runTerminal($('#terminal'));
  this.disabled = true;
};

function runTerminal($terminal) {
  if (!$terminal.data('terminalPrompt').length) {
    $terminal.data('terminalPrompt', '$ ');
  }

  runTerminalLine($terminal.find('[data-terminal]:first'), $terminal);
}

function runTerminalLine($line, $terminal) {
  if ($line.data('terminalMessage') == "prompt") {
    $line.data('terminalMessage', $terminal.data('terminalPrompt'));
  }
  if ($line.data('terminal') == "line") {
    setTimeout(function () {
      runTerminalLinePrint($line, $terminal);
    }, parseInt($line.data('terminalTime')));
  } else {
    setTimeout(function () {
      runTerminalLineType($line, $terminal);
    }, parseInt($line.data('terminalTime')));
  }
}

function runTerminalLinePrint($line, $terminal) {
  var $target = $('<span class="line"></span>');
  var $output = $terminal.find('.output');
  $output.append($target);
  $target.append($line.data('terminalMessage'));

  $output.animate({ scrollTop: $output[0].scrollHeight }, 1);

  $nextLine = $line.next('[data-terminal]');
  if ($nextLine.length) {
    runTerminalLine($nextLine, $terminal);
  } else {  //文字输出结束
    $('#terminal-window').fadeOut(2000);
    $('#cxo-content-outer').fadeIn(6000);
  }
}

function runTerminalLineType($line, $terminal, $target, index) {
  var $output = $terminal.find('.output');

  if (!$target) {
    var $target = $output.find('.line:last');
  }

  if (!index) {
    index = 0;
  }

  var message = $line.data('terminalMessage');

  if (index < message.length) {
    $target.append(message[index++]);
    return setTimeout(function () {
      runTerminalLineType($line, $terminal, $target, index);
    }, Math.floor(Math.random() * ($line.data('terminalTextSpeed') ? parseInt($line.data('terminalTextSpeed')) : 100)) + 1);
  }

  $output.animate({ scrollTop: $output[0].scrollHeight }, 1);

  $nextLine = $line.next('[data-terminal]');
  if ($nextLine.length) {
    runTerminalLine($nextLine, $terminal);
  }
}
