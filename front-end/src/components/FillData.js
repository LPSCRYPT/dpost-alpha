import React, { Component } from "react";
import { ethers } from "../../../buidler/node_modules/ethers";
import { observer, inject } from "mobx-react";

const FillDataObserver = inject("store")(
	observer(
		class FillData extends Component {
			componentDidMount() {
				this.poll();
			}

			poll = async () => {
				this.props.store.dPost.on(
					"NewPost",
					(author, timestamp, content, numID) => {
						if (numID.toNumber() + 1 > this.props.store.postNum) {
							let obj = {
								author: author,
								timestamp: timestamp.toNumber(),
								mood: 0,
								removed: false,
								content: content,
								numID: numID.toNumber(),
							};
							this.props.store.addPost(obj);
						}
					}
				);
				this.props.store.provider.on("block", async (block) => {
					let timer = await this.props.store.viewer.checkTime(
						this.props.store.address
					);
					let times = [];
					times.push(timer[0].toNumber());
					times.push(timer[1].toNumber());
					this.props.store.setTimer(times);
				});
			};

			render() {
				return null;
			}
		}
	)
);

export default FillDataObserver;
