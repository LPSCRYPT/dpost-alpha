import { observable, action, decorate, toJS } from "mobx";

class Store {
	//initialize variables
	loading = true;
	provider = null;
	signer = null;
	address = null;
	dPost = null;
	viewer = null;
	postNum = null;
	posts = [];
	timer = [0, 0];
	userRole = "";

	//setters && intialize functions
	setProvider(input) {
		this.provider = input;
	}

	setSigner(input) {
		this.signer = input;
	}

	setUserAddress(input) {
		this.address = input;
	}

	setdPost(input) {
		this.dPost = input;
	}

	setViewer(input) {
		this.viewer = input;
	}

	setPostNum(input) {
		this.postNum = input;
	}

	initializePosts(input) {
		this.posts = input;
	}

	setTimer(input) {
		this.timer[0] = input[0];
		this.timer[1] = input[1];
	}

	setUserRole(input) {
		this.userRole = input;
	}

	switchLoading() {
		this.loading = !this.loading;
	}

	addGrog(id) {
		this.posts[id].mood = this.posts[id].mood + 1;
	}

	deletePost(id) {
		this.posts[id].removed = true;
	}

	addPost(input) {
		this.posts.push(input);
	}
}

decorate(Store, {
	loading: observable,
	provider: observable,
	signer: observable,
	address: observable,
	dPost: observable,
	viewer: observable,
	postNum: observable,
	posts: observable,
	timer: observable,
	userRole: observable,
	setProvider: action,
	setSigner: action,
	setUserAddress: action,
	setdPost: action,
	setViewer: action,
	setPostNum: action,
	switchLoading: action,
	initializePosts: action,
	setTimer: action,
	setUserRole: action,
	addGrog: action,
	deletePost: action,
	addPost: action,
});

export default Store;
