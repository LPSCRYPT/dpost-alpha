import React, { Component, useState, Fragment } from "react";
import { ethers } from "../../../buidler/node_modules/ethers";
import { observer, inject } from "mobx-react";
import { Box, Image } from "@chakra-ui/core";
import grog from "../img/grog.png";
import plus from "../img/green_plus.png";

const PostObserver = inject("store")(
	observer(
		class Post extends Component {
			constructor() {
				super();
				this.handleGrog = this.handleGrog.bind(this);
				this.handleDelete = this.handleDelete.bind(this);
			}

			handleGrog = async () => {
				if (
					this.props.store.userRole == "Admin" ||
					this.props.store.userRole == "User"
				) {
					let tx = await this.props.store.dPost.postMood(this.props.numID);
					let receipt = await tx.wait();
					console.log(receipt, "receipt");
					if (receipt.status == 1) {
						this.props.store.addGrog(this.props.numID);
					}
				} else {
					alert("Landlubbers can't give Grog.");
				}
			};

			handleDelete = async () => {
				if (this.props.store.userRole == "Admin") {
					let tx = await this.props.store.dPost.removePost(this.props.numID);
					let receipt = await tx.wait();
					if (receipt.status == 1) {
						this.props.store.deletePost(this.props.numID);
					}
				}
			};

			render() {
				return (
					<Fragment>
						<Box
							className="postBox"
							maxW="500px"
							mx="auto"
							my="50px"
							color="gray.500"
							border="4px"
							borderColor="green.200"
							borderRadius="md"
							backgroundColor="black"
							textAlign="center"
							boxShadow="7px 7px #7930a6"
							display="flex"
							flexDirection="column"
						>
							<Box
								justifyContent="space-between"
								w="100%"
								display="flex"
								flexDirection="row"
							>
								<Box
									display="flex"
									flexDirection="row"
									fontSize=".8em"
									ml="5px"
								>
									<Box>PostID: {this.props.numID}</Box>
									{this.props.store.userRole == "Admin" ? (
										<Box
											ml="15px"
											color="red.200"
											className="cursorPoint"
											onClick={this.handleDelete}
										>
											Delete Post
										</Box>
									) : null}
								</Box>
								<Box
									alignSelf="flex-end"
									mr="5px"
									display="flex"
									flexDirection="row"
								>
									<Box mr="5px">
										Grog: {this.props.store.posts[this.props.numID].mood}
									</Box>
									<Image
										src={plus}
										alt=""
										maxH="20px"
										mt="2px"
										mr="3px"
										onClick={this.handleGrog}
										className="cursorPoint"
									/>
									<Image
										mt="2px"
										maxH="20px"
										src={grog}
										alt=""
										onClick={this.handleGrog}
										className="cursorPoint"
									/>
								</Box>
							</Box>
							<Box color="white" mt="10px" mb="15px">
								{this.props.content}
							</Box>
							<Box
								justifyContent="space-between"
								w="100%"
								display="flex"
								flexDirection="row"
								fontSize=".7em"
							>
								<Box ml="3px">
									{new Date(this.props.timestamp * 1000)
										.toString()
										.slice(0, 33)}
								</Box>
								<Box alignSelf="flex-start" mr="3px">
									{this.props.author}
								</Box>
							</Box>
						</Box>
					</Fragment>
				);
			}
		}
	)
);

export default PostObserver;
