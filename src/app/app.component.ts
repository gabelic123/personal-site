import { Component, OnInit } from '@angular/core';
import { InfoHtml } from './infoHtml';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

	greeting: string = 'Hi! ';
	nouns: string[] = ["ENGINEER", "DEVELOPER", "ADVENTURER","TINKERER", "LEARNER", "TRAVELER", 
  "ENTREPRENEUR", "EXPERIMENTER", "ANALYZER", "READER", "OBSERVER", "FOODIE", "TECHNOLOGIST", 
  "CREATOR", "STRATEGIST", "INNOVATOR", "IDEATOR"];
  	info: string[] = InfoHtml;
  	sections: any[] = [{
  		title: 'Experience',
  		active: false,
  		content: this.info[0],
  		left: true
  	}, {
   		title: 'Education', 		
  		active: false,
  		content: this.info[1],
  		left: true
  	}, {
   		title: 'Projects',
  		active: false,
  		content: this.info[2],
  		left: true
  	}, {
  		title: 'Skills',
  		active: false,
  		content: this.info[3],
  		left: true
  	}, {
   		title: 'Contact',
  		active: false,
  		content: this.info[4],
  		left: true
  	}];
  	clickable: boolean = false;
  	isActive: boolean = false;

	ngOnInit () {
		this.typeText('My name is Gabe Licona', 100, 1200).then( (res) => {
			this.swipeSections(false, -1).then( (res) => {
				this.clickable = true;
				this.backspace(0, 15, 75, 2500).then( (res) => {
					this.typeText(': ', 100, 500).then( (res) => {
						this.switchNouns();
					});
				});
			});
		});
	}

	async switchNouns () {
		this.nouns = this.shuffleArray(this.nouns);
		for(var i = 0; i < this.nouns.length; i++) {
			await this.typeText(this.nouns[i], 100, 1200);
			await this.backspace1(this.nouns[i].length - 1, 75, 1000);
			if(i === this.nouns.length - 1) {
				i = -1;
				this.nouns = this.shuffleArray(this.nouns);
			}
		}
	}


	typeText = (text, speed, delay) => {
		var initialText = this.greeting;
		var counter = 0;
		return new Promise( (resolve, reject) => {
			try {
				setTimeout(() => {
					var interval = setInterval( () => {
						if (counter > text.length) {
							clearInterval(interval);
							resolve('done');
						} else {
							this.greeting = initialText.concat(text.substr(0, counter));
							counter++;
						}
					}, speed);
				}, delay);
			} catch (e) {
				reject(e);
			}
		});
	}

	backspace = (leftIndex, rightIndex, speed, delay) => {
		var removeStr = this.greeting.slice(leftIndex, rightIndex);
		var leftStr = this.greeting.slice(0, leftIndex);
		var rightStr = this.greeting.slice(rightIndex);
		var counter = 0;
		return new Promise ( (resolve, reject) => {
			try {
				setTimeout(() => {
					var interval = setInterval( () => {
						if(counter > removeStr.length) {
							clearInterval(interval);
							resolve('done');
						} else {
							this.greeting = leftStr.concat(removeStr.slice(leftIndex, rightIndex - counter)).concat(rightStr);
							counter++;
						}
					}, speed);
				}, delay);
			} catch (e) {
				reject(e);
			}
		});
	}

	backspace1 = (length, speed, delay) => {
		var counter = 0;
		var origString = this.greeting;
		return new Promise ( (resolve, reject) => {
			try {
				setTimeout(() => {
					var interval = setInterval( () => {
						if(counter > length) {
							clearInterval(interval);
							resolve('done');
						} else {
							this.greeting = this.greeting.slice(0, this.greeting.length - 1);
							counter++;
						}
					}, speed);
				}, delay);
			} catch (e) {
				reject(e);
			}
		});
	}

	shuffleArray (array: any[]): any[] {
	  let currentIndex = array.length, temporaryValue, randomIndex;
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
  		return array;
	};

	titleClicked (index: number) {
		if(!this.clickable) {
			return;
		}
		this.clickable = false;
		for(var i = 0; i < this.sections.length; i++) {
			if(this.sections[i].active  === true) {
				if(i !== index) {
					return;
				}
			}
		}

		if(this.sections[index].active === false) {
			this.swipeSections(true, index).then( (res) => {
				this.sections[index].active = true;
				this.clickable = true;
				this.isActive = true;
			} );
		} else {
			this.sections[index].active = false;
			this.swipeSections(false, index).then( (res) => {
				this.clickable = true;
				this.isActive = false;
			});
		}
	}

	swipeSections (left: boolean, index: number) {
		return new Promise ((resolve, reject) => {
			try {
				var counter = 0;
				var interval = setInterval(() => {
					if (counter >= this.sections.length) {
						clearInterval(interval);
						resolve('done');
					} else {
						if (counter !== index) {
							this.sections[counter].left = left;
						}
						counter++;
					}
				}, 100);
			} catch (e) {
				reject(e);
			}
		});
	}

	transitionEnd (e) {
		console.log(e);
	}
  
}
