import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import Post from "./Post";
var _ = require("lodash");

const PostListObserver = inject("store")(
	observer(
		class PostList extends Component {
			constructor(props) {
				super(props);
				this.loadPosts = this.loadPosts.bind(this);
			}

			loadPosts() {
				let list = [];
				for (let i = this.props.store.posts.length - 1; i >= 0; i--) {
					if (!this.props.store.posts[i].removed) {
						list.push(
							<Post
								author={this.props.store.posts[i].author}
								timestamp={this.props.store.posts[i].timestamp}
								mood={this.props.store.posts[i].mood}
								content={this.props.store.posts[i].content}
								numID={this.props.store.posts[i].numID}
								key={i}
							/>
						);
					}
				}
				return list;
			}

			render() {
				return (
					<Fragment>
						{this.props.store.loading ? null : this.loadPosts()}
					</Fragment>
				);
			}
		}
	)
);

export default PostListObserver;
