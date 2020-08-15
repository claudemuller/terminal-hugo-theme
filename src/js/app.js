const $scanlines = $('.scanlines'),
	$tv = $('.tv');

const term = $('#term').terminal({
	exit,
	greeting,
	login,
	less: function(url) {
		// $.get(url).then(text => {
		// 	this.less(text);
		// });
	}
}, {
	name: 'terminal_web',
	exit: false,
	history: true,
	autocompleteMenu: true,
	completion: ['exit', 'greeting', 'login'],
	prompt: 'hax0r@unschooled.life:~$ ',
	greetings,
	onResize: setSize,
	onInit: self => {
		setSize();
		self.echo('Type [[b;#fff;]exit] to shutdown unschooled.life [for you, not everyone :)]');
		self.echo('');
	},
	onClear: self => {
		self.echo('Type [[b;#fff;]exit] to shutdown unschooled.life [for you, not everyone :)]');
		self.echo('');
	},
	onCommandNotFound: (command, self) => {
		try {
			const result = window.eval(command);

			if (result && result instanceof $.fn.init) {
				term.echo('<#jQuery>');
			} else if (result && typeof result === 'object') {
				tree(result);
			} else if (result !== undefined) {
				term.echo(result.toString());
			}
		} catch(e) {
			term.error(e.toString());
		}
	}
});

function setSize() {
	const height = $(window).height(),
		width = $(window).width(),
		time = (height * 2) / 170;

	$scanlines[0].style.setProperty("--time", time);
	$tv[0].style.setProperty("--width", width);
	$tv[0].style.setProperty("--height", height);
}

function tree(obj) {
	term.echo(treeify.asTree(obj, true, true));
}

function confirm() {
	term.confirm('Are you sure? Y/N ').then(function(confirm) {
		if (confirm) {
			console.log('User confirm');
		} else {
			console.log("User didn't confirm");
		}
	});
}

function exit() {
	$tv.addClass('collapse');
	term.disable();
}

function greeting() {
	term.echo(greetings());
}

function login() {
	term.login('test', 'test');
}

function greetings() {
	return `                               __                      ___              __     
                              /\\ \\                    /\\_ \\            /\\ \\    
 __  __    ___     ____    ___\\ \\ \\___     ___     ___\\//\\ \\      __   \\_\\ \\   
/\\ \\/\\ \\ /' _ \`\\  /',__\\  /'___\\ \\  _ \`\\  / __\`\\  / __\`\\\\ \\ \\   /'__\`\\ /'_\` \\  
\\ \\ \\_\\ \\/\\ \\/\\ \\/\\__, \`\\/\\ \\__/\\ \\ \\ \\ \\/\\ \\L\\ \\/\\ \\L\\ \\\\_\\ \\_/\\  __//\\ \\L\\ \\ 
 \\ \\____/\\ \\_\\ \\_\\/\\____/\\ \\____\\\\ \\_\\ \\_\\ \\____/\\ \\____//\\____\\ \\____\\ \\___,_\\
  \\/___/  \\/_/\\/_/\\/___/  \\/____/ \\/_/\\/_/\\/___/  \\/___/ \\/____/\\/____/\\/__,_ /                                                               
  ___           ___                                                            
 /\\_ \\    __  /'___\\                                                           
 \\//\\ \\  /\\_\\/\\ \\__/   __                                                      
   \\ \\ \\ \\/\\ \\ \\ ,__\\/'__\`\\                                                    
 __ \\_\\ \\_\\ \\ \\ \\ \\_/\\  __/                                                    
/\\_\\/\\____\\\\ \\_\\ \\_\\\\ \\____\\                                                   
\\/_/\\/____/ \\/_/\\/_/ \\/____/                                                   
                                                                               
	`;
}

cssVars();
