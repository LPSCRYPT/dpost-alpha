import React, { Component } from "react";
import { ethers } from "../../../buidler/node_modules/ethers";
import { observer, inject } from "mobx-react";
import FillData from "./FillData";
const abi = require("../Contract/abi");

const ConnectEthersObserver = inject("store")(
	observer(
		class ConnectEthers extends Component {
			constructor(props) {
				super(props);
				//bind functions locally
				this.checkMetaMask = this.checkMetaMask.bind(this);
				// this.setProvider = this.setProvider.bind(this);
				this.setSigner = this.setSigner.bind(this);
				this.setSigners = this.setSigners.bind(this);
				this.initializeStore = this.initializeStore.bind(this);
			}

			componentDidMount = async () => {
				await this.checkMetaMask();
			};

			setProvider = (x) => {
				this.props.store.setProvider(x);
			};

			setSigner = (x) => {
				this.props.store.setSigner(x);
			};

			setUserAddress = (input) => {
				this.props.store.setUserAddress(input);
			};

			setSigners = (x, y) => {
				this.props.store.setdPost(x);
				this.props.store.setViewer(y);
			};

			initializeStore = async () => {
				let postLength = (
					await this.props.store.viewer.getPostNum()
				).toNumber();
				this.props.store.setPostNum(postLength);
				let arr = [];
				for (let i = 0; i < postLength; i++) {
					let post = await this.props.store.viewer.getPostById(i);
					arr.push({
						author: post[0],
						timestamp: post[1].toNumber(),
						mood: post[2].toNumber(),
						removed: post[3],
						content: post[4],
						numID: post[5].toNumber(),
					});
				}
				this.props.store.initializePosts(arr);
				let userStatus = "Not a user";
				let isAdmin = await this.props.store.viewer.checkAdmin(
					this.props.store.address
				);
				if (isAdmin) {
					userStatus = "Admin";
					let timer = await this.props.store.viewer.checkTime(
						this.props.store.address
					);
					let times = [];
					times.push(timer[0].toNumber());
					times.push(timer[1].toNumber());
					console.log(times);
					this.props.store.setTimer(times);
				} else {
					let isUser = await this.props.store.viewer.checkUser(
						this.props.store.address
					);
					if (isUser) {
						userStatus = "User";
						let timer = await this.props.store.viewer.checkTime(
							this.props.store.address
						);
						let times = [];
						times.push(timer[0].toNumber());
						times.push(timer[1].toNumber());
						this.props.store.setTimer(times);
					}
				}
				this.props.store.setUserRole(userStatus);

				this.props.store.switchLoading();
			};

			checkMetaMask = async () => {
				window.addEventListener("load", async () => {
					if (typeof web3 !== "undefined") {
						await window.ethereum.enable();
						let provider = new ethers.providers.Web3Provider(window.ethereum);
						this.setProvider(provider);
						let signer = provider.getSigner(0);
						this.setSigner(signer);
						let address = await signer.getAddress();
						this.setUserAddress(address);
						if (address == undefined) {
							console.log("Metamask found, but not logged in");
							// Toaster with: Please log in to MetaMask uwu
						} else {
							let signInstance = new ethers.Contract(
								"0x7516ab73e1041eeb2201f22c6c4cca2a23160b3a",
								abi,
								signer
							);
							let viewInstance = new ethers.Contract(
								"0x7516ab73e1041eeb2201f22c6c4cca2a23160b3a",
								abi,
								provider
							);
							if (this.props.store.loading) {
								this.setSigners(signInstance, viewInstance);
								this.initializeStore();
							}
						}
					} else {
						console.log("Web3 not injected");
						// Toaster with: Please log in to MetaMask uwu
					}
				});
			};
			render() {
				return !this.props.store.dPost ? null : <FillData />;
			}
		}
	)
);

export default ConnectEthersObserver;
