import { useEffect, useState } from "react";
import { connectWallet, metaMask } from "./utils/interact.js";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import {listNftItems, listNftCollection, ListWallets} from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsconfig);

const MoonVest = (props) => {
	// State hook variables.
	const [isConnected, setConnectedStatus] = useState(false);
	const [status, setStatus] = useState("");
	const [walletAddress, setWallet] = useState("");
	const [walletBalance, setBalance] = useState("00.00");
	const [walletSupply, setTotalSupply] = useState("00.00");
	const [totalBurn, setTotalBurn] = useState("00.00");
	const [price, setPrice] = useState("0.00");
	const [marketCap, setMarketCap] = useState("0.00");
	const [anchorEl, setAnchorEl] = useState(null);
	const [nftItems, setNftItems] = useState(null);
	
	// Similar to componentDidMount and componentDidUpdate.
	useEffect(async () => {

		fetchNftItems();
		console.log(nftItems); 

		// Is MetaMask installed?
		if (window.ethereum)
		{
			// Yes.
			try
			{
				// Get MetaMask wallet.
				const accounts = await window.ethereum.request({
					method: "eth_accounts"
				});
				
				// Is MetaMask account connected?
				if (accounts.length)
				{
					// Yes.
					setConnectedStatus(true);
					setWallet(accounts[0]);

					await processWalletData();
				}
				else
				{
					// No.
					setConnectedStatus(false);
					setStatus("🦊 Connect to MetaMask using the Connect Wallet button.");
				}
			}
			catch
			{
				// An error occured while trying to connect wallet.
				setConnectedStatus(false);
				setStatus("🦊 Disconnect wallet from Metamask then reconnect with Connect Wallet button. " + walletAddress);
			}
		}
	});

	async function fetchNftItems() {
		console.log("fetchNFTStart");
		//Get NFT Data
		const apiData = await API.graphql(graphqlOperation(listNftItems));
		console.log(apiData);
		setNftItems(apiData.data.listNftItems.items);
		console.log("fetchNFTEnd");
  }
	
	// On click event of Connect Wallet Button.
	const connectWalletClicked = async () => {
		const walletResponse = await connectWallet();
		
		// Update state hooks.
		setConnectedStatus(walletResponse.connectedStatus);
		setStatus(walletResponse.status);
		
		if (isConnected) 
		{
			setWallet(walletResponse.address);
			await processWalletData();
		}
	};

	// Data filler for wallet state hooks.
	const processWalletData = async () => {
		const metaMaskData = await metaMask(String(walletAddress));
		setBalance(metaMaskData.walletBalance);
		setTotalSupply(metaMaskData.totalSupply);
		setTotalBurn(walletSupply);
	};
	
	// The UI of our component.
	return (
		<>
			{/* <!-- ============================ Hero Banner  Start================================== --> */}
			<div className="hero-banner bg-cover" style={{background: "linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(78, 92, 124, 0.7)), url(img/gallery.jpg) no-repeat" }} data-overlay="5">
				<div className="container">
					<h1>Collect and Trade NFTs</h1>
					<p className="lead">Digital Assets Secured by Blockchain Technology</p>
					<form className="mt-4">
						<div className="row">
							<div className="col-lg-7 col-md-9 col-sm-12">
								<div className="banner-search style-1">
									<div className="input-group">
										<input type="text" className="form-control radiup" placeholder="Search NFTs" />
										<div className="input-group-append b-l">
											<button type="button" className="btn bt-round trans"><i className="ti-search"></i></button>
										</div>
									</div>
								</div>
								<div className="featured-category">
									<ul>
										<li>Browse:</li>
										<li><a href="#">Art</a></li>
										<li><a href="#">Collectibles</a></li>
										<li><a href="#">DeFi</a></li>
										<li><a href="#">Gaming</a></li>
										<li><a href="#">Charity</a></li>
									</ul>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* <!-- ============================ Hero Banner End ================================== --> */}

			{/* <!-- ============================ All Images List Start ================================== --> */}
			<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12">
							
							<div className="urip_column_wrap">
								
								<div className="urip_column_single">
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/500/400" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/300/400" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
								
								</div>
								
								<div className="urip_column_single">
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/400/300" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/500/450" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/300/410" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
								
								</div>
								
								<div className="urip_column_single">
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/330/410" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/400/300" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									{/* <!-- Single Image Product --> */}
									<div className="urip_column_three">
										<div className="item_image_urip">
											<a href="item-detail.html" className="urip_link download"><i className="fa fa-download"></i></a>
											<a href="premium-stock-detail.html" className="item-img">
												<img src="https://picsum.photos/380/410" className="img-fluid" alt="" />
											</a>
											<div className="image_urip_caption">
												<div className="urip_caption_flex">
													<div className="urip_author">
														<div className="urip_avater">
															<a href="author-detail.html.html" className="author-img">
																<img src="https://picsum.photos/400/400" className="img-fluid" alt="" />
															</a>
														</div>
														<div className="urip_avater_place">
															<h3 className="urip_title"><a href="author-detail.html.html">Adam vilson</a></h3>
															<span>Liverpool, London</span>
														</div>
													</div>
												</div>
												<div className="urip_caption_last">
													<div className="item_list_links">
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-plus-circle"></i></a>
														<a href="premium-stock-detail.html" className="urip_link"><i className="fa fa-heart"></i></a>
													</div>
												</div>
											</div>
										</div>
									</div>
								
								</div>
							
							</div>
							
						</div>
					</div>
					
					<div className="row">
						<div className="col-lg-12 col-md-12 text-center">
							<a href="#" className="ure09w">Browse More</a>
						</div>
					</div>
					
				</div>
			</section>
			{/* <!-- ============================ All Images List End ================================== --> */}

			{/* <!-- ============================ Authors List ================================== --> */}
			<section className="gray-light min-sec">
				<div className="container">
					<div className="row justify-content-center">
					
						{/* <!-- Single --> */}
						<div className="col-lg-2 col-md-3 col-sm-4">
							<div className="royh9">
								<img src="img/mvn-blue.png" className="img-fluid" alt="" />
							</div>
						</div>	
						{/* <!-- Single --> */}
						<div className="col-lg-2 col-md-3 col-sm-4">
							<div className="royh9">
								<img src="img/binance-smart-chain-logo.png" className="img-fluid" alt="" />
							</div>
						</div>
						{/* <!-- Single --> */}
						<div className="col-lg-2 col-md-3 col-sm-4">
							<div className="royh9">
								<img src="img/pancakeswap.png" className="img-fluid" alt="" />
							</div>
						</div>
						{/* <!-- Single --> */}
						<div className="col-lg-2 col-md-3 col-sm-4">
							<div className="royh9">
								<img src="img/bscscan.png" className="img-fluid" alt="" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- ============================ Author Lists End ================================== --></div> */}

			{/* <!-- ============================ Photo category List ================================== --> */}
			<section className="min-sec">
				<div className="container">
					
					{/* <div className="row justify-content-center">
						<div className="col-lg-7 col-md-9">
							<div className="sec-heading">
								<h2>Featured Images with Tags</h2>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
						</div>
					</div> */}
					
					<div className="row">
					
						{/* <!-- Single Pricing Box --> */}
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="_45lio">
								<div className="_jk58o">
									<a href="#" className="_5gt9"><img src="https://picsum.photos/700/400" className="img-fluid" alt="" /></a>
									<div className="_io980">
										<h4 className="_95lp"><a href="#" className="_50gt">Wedding & Marriage</a></h4>
										<span className="_ip76n">5k Images</span>
									</div>
								</div>
								<div className="_45lik">
									<p>Download amazing photos and pictures for free.</p>
									<div className="_ft76y">
										<div className="_65ero"><a>Nature Image</a></div>
										<div className="_65ero"><a>Cool</a></div>
										<div className="_65ero"><a>HD Images</a></div>
									</div>
								</div>
							</div>
						</div>
						
						{/* <!-- Single Pricing Box --> */}
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="_45lio">
								<div className="_jk58o">
									<a href="#" className="_5gt9"><img src="https://picsum.photos/500/400" className="img-fluid" alt="" /></a>
									<div className="_io980">
										<h4 className="_95lp"><a href="#" className="_50gt">Work & Desk</a></h4>
										<span className="_ip76n">3.2k Images</span>
									</div>
								</div>
								<div className="_45lik">
									<p>Download amazing photos and pictures for free.</p>
									<div className="_ft76y">
										<div className="_65ero"><a>Nature Image</a></div>
										<div className="_65ero"><a>Cool</a></div>
										<div className="_65ero"><a>HD Images</a></div>
									</div>
								</div>
							</div>
						</div>
						
						{/* <!-- Single Pricing Box --> */}
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="_45lio">
								<div className="_jk58o">
									<a href="#" className="_5gt9"><img src="https://picsum.photos/450/400" className="img-fluid" alt="" /></a>
									<div className="_io980">
										<h4 className="_95lp"><a href="#" className="_50gt">Destinations</a></h4>
										<span className="_ip76n">4.7k Images</span>
									</div>
								</div>
								<div className="_45lik">
									<p>Download amazing photos and pictures for free.</p>
									<div className="_ft76y">
										<div className="_65ero"><a>Nature Image</a></div>
										<div className="_65ero"><a>Cool</a></div>
										<div className="_65ero"><a>HD Images</a></div>
									</div>
								</div>
							</div>
						</div>
						
						{/* <!-- Single Pricing Box --> */}
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="_45lio">
								<div className="_jk58o">
									<a href="#" className="_5gt9"><img src="https://picsum.photos/400/410" className="img-fluid" alt="" /></a>
									<div className="_io980">
										<h4 className="_95lp"><a href="#" className="_50gt">Flowers</a></h4>
										<span className="_ip76n">5.2k Images</span>
									</div>
								</div>
								<div className="_45lik">
									<p>Download amazing photos and pictures for free.</p>
									<div className="_ft76y">
										<div className="_65ero"><a>Nature Image</a></div>
										<div className="_65ero"><a>Cool</a></div>
										<div className="_65ero"><a>HD Images</a></div>
									</div>
								</div>
							</div>
						</div>
						
						{/* <!-- Single Pricing Box --> */}
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="_45lio">
								<div className="_jk58o">
									<a href="#" className="_5gt9"><img src="https://picsum.photos/400/405" className="img-fluid" alt="" /></a>
									<div className="_io980">
										<h4 className="_95lp"><a href="#" className="_50gt">Workspace</a></h4>
										<span className="_ip76n">12k Images</span>
									</div>
								</div>
								<div className="_45lik">
									<p>Download amazing photos and pictures for free.</p>
									<div className="_ft76y">
										<div className="_65ero"><a>Nature Image</a></div>
										<div className="_65ero"><a>Cool</a></div>
										<div className="_65ero"><a>HD Images</a></div>
									</div>
								</div>
							</div>
						</div>
						
						{/* <!-- Single Pricing Box --> */}
						<div className="col-lg-4 col-md-6 col-sm-12">
							<div className="_45lio">
								<div className="_jk58o">
									<a href="#" className="_5gt9"><img src="https://picsum.photos/430/400" className="img-fluid" alt="" /></a>
									<div className="_io980">
										<h4 className="_95lp"><a href="#" className="_50gt">Interior Design</a></h4>
										<span className="_ip76n">32k Images</span>
									</div>
								</div>
								<div className="_45lik">
									<p>Download amazing photos and pictures for free.</p>
									<div className="_ft76y">
										<div className="_65ero"><a>Nature Image</a></div>
										<div className="_65ero"><a>Cool</a></div>
										<div className="_65ero"><a>HD Images</a></div>
									</div>
								</div>
							</div>
						</div>
						
					</div>
					
				</div>
			</section>
			{/* <!-- ============================ Photo category End ================================== --></div> */}

			{/* <!-- ============================ Call To Action Start ================================== --> */}
			<section className="call-to-act" style={{background: "#5d47dd url(img/landing-bg.png) no-repeat"}}>
				<div className="container">
					<div className="row justify-content-center">
					
						<div className="col-lg-7 col-md-8">
							<div className="clt-caption text-center mb-4">
								<h3>Find NFTs</h3>
				
							</div>
							<div className="inner-flexible-box subscribe-box">
								<div className="input-group">
									<input type="text" className="form-control large" placeholder="search by keyword" />
									<button className="btn btn-subscribe" type="button"><i className="fa fa-arrow-right"></i></button>
								</div>
							</div>
						</div>				
					</div>
				</div>
			</section>
			{/* <!-- ============================ Call To Action End ================================== --></section> */}
		</>
	);
}

export default MoonVest;