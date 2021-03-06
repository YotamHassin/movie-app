<!-- info.html -->
<!doctype html>
<html>

<head>
	<title>User Management</title>
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		body {
			/* font-family: Arial, Helvetica, sans-serif;
			font-size: 1rem; */

			font: 13px Helvetica, Arial;
			margin: 14px 35px;
		}

		#text {
			color: #060606;
			line-height: 1.5;
			max-width: 48rem;
			margin: auto;
			padding: 1rem 2rem 1rem 2rem;
		}

		h1,
		h3 {
			margin: 20px 0px;
		}

		a {
			display: block;
			margin: 8px 0px;
		}

		p {
			margin: 15px 10px;
		}

		ul {
			margin: 10px 30px;
		}

		li {
			margin: 15px 15px;
		}

		blockquote {
			border-left-style: solid;
			border-left-color: lightgrey;
			padding-left: 10px;
			background-color: rgb(245, 247, 249);
		}

		pre {
			font-family: monospace;
			background-color: #fff;
			margin: auto auto;
			padding: 0.5em;
			border-radius: .25em;
			box-shadow: 0.1em 0.1em 0.5em rgba(0, 0, 0, 0.45);
			counter-reset: line;
		}

		pre span {
			display: block;
			line-height: 1.5rem;
		}
	</style>

	<style>
		.flex-container-column {
			height: 100%;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
			-webkit-flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
			-webkit-justify-content: space-around;
			-ms-flex-pack: distribute;
			justify-content: space-around;
			-webkit-align-content: space-around;
			-ms-flex-line-pack: distribute;
			align-content: space-around;
			-webkit-align-items: flex-start;
			-ms-flex-align: start;
			align-items: flex-start;
		}

		.flex-container-row {
			width: 100%;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			-webkit-flex-direction: row;
			-ms-flex-direction: row;
			flex-direction: row;
			-webkit-flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
			-webkit-justify-content: space-around;
			-ms-flex-pack: distribute;
			justify-content: space-around;
			-webkit-align-content: flex-start;
			-ms-flex-line-pack: start;
			align-content: flex-start;
			-webkit-align-items: flex-start;
			-ms-flex-align: start;
			align-items: flex-start;
		}

		.flex-item {
			margin: 11px 0px;
			-webkit-order: 0;
			-ms-flex-order: 0;
			order: 0;
			-webkit-flex: 0 1 auto;
			-ms-flex: 0 1 auto;
			flex: 0 1 auto;
			-webkit-align-self: auto;
			-ms-flex-item-align: auto;
			align-self: auto;
		}
	</style>
</head>

<body>
	<h1 id="Introduction">User Management</h1>


	<h3>mongoose-user-management</h3>
	<a target="_blank" rel="noopener noreferrer"
		href="https://www.npmjs.com/package/mongoose-user-management">mongoose-user-management</a>

	<pre>
		<code>
		const user=require('mongoose-user-management')
		const mongoose = require('mongoose');
		
		let fake = {
					email:"test@test.com",
					username:"test",
					password:"sddada",
					firstName: "Manish",
					lastName: "Ranjan",
					middleName:"mi",
					identificationNumber:"55555",
					phoneNumber1:"5555555",
					phoneNumber2:"ffffffffffff",
					address:{
						address1:"101 Metlife Way",
						address2:"Test way",
						zip:"27513",
						state:"NC",
						city:"Cary",
						country:"USA"
					}
		}
		
		(async function(){
		
		await mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true }); 
			mongoose.connection
				.once('open', () =&gt; console.log('Connected!'))
				.on('error', (error) =&gt; {
					console.warn('Error : ',error);
				});
		
		
		user.register(fake)
		})();
		
		</code></pre>

	<ul>
		<li>
			<h4>executive summary</h4>
			<ul>
				<li>executive note</li>
				<li>mission statement</li>
				<li>
					overall/summary
					<ul>
						<li>vision and key directions</li>
						<li>goals and priorities</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>
			<h4>strategic(outline) and tactics(inline) goals</h4>
			<ul>
				<li>goal area 1- application/product/servise development</li>
				<li>goal area 2- client customer service</li>
				<li>goal area 3- marketing/PR(public relations)</li>
				<li>goal area 4- professional development <b>Creative</b></li>
			</ul>
		</li>

		<li>
			<h4>SWOT (strengths, weaknesses, opportunities, and threats) analysis and industry analysis</h4>
			<div class="flex-container-column">
				<div class="flex-container-row">
					<div class="flex-item">
						<h4>Internal Factors</h4>
					</div>
				</div>
				<div class="flex-container-row">
					<div class="flex-item">strengths
						<div>strengths block</div>
						<div>block2</div>
					</div>
					<div class="flex-item">weaknesses</div>
				</div>

				<hr>

				<div class="flex-container-row">
					<div class="flex-item">
						<h4>External Factors</h4>
					</div>
				</div>
				<div class="flex-container-row">
					<div class="flex-item">opportunities</div>
					<div class="flex-item">threats</div>
				</div>
				<div class="flex-container-row">
					<div class="flex-item">industry trends(analysis)</div>
				</div>
			</div>
		</li>
		<li>financial and organisational structuring</li>
		<li>expected result or measurement of success</li>
		<li>conclusion</li>
	</ul>



	<p>This paper is a technical introduction to the Bitcoin electronic cash system. It presents the design principles
	</p>

	<h1 id="Objective">Objective</h1>

	<p>The objective expressed in <a target="_blank" rel="noopener noreferrer"
			href="http://nakamotoinstitute.org/bitcoin/">Satoshi Nakamoto's paper</a> is to provide an electronic
		currency
		without intermediary institutions: neither trusted third party for the payment, nor a supervisory authority for
		monetary creation. It relies on a public ledger of transactions with an infalsifiable recording that can be
		verified
		by all, but whose stakeholders remain anonymous. The context for applying this currency is e-commerce on the
		Internet.</p>

	<h1 id="The Bitcoin Network">The Bitcoin Network</h1>
	<h3 id="peer-to-peer">A peer to peer network</h3>

	<p>The Bitcoin network is the internet network used as a peer-to-peer network. All participants in the Bitcoin
		network
		have the same status; no participant can claim any higher legitimacy. Each participant is considered as a peer
		to
		the others.</p>

	<h3 id="messages">The messages</h3>

	<p>Two main types of messages are broadcasted as widely as possible on the Internet:</p>

	<ul>
		<li>the transaction, which represents a payment,</li>
		<li>the block, which records a collection of transactions.</li>
	</ul>

	<p>When a new transaction is signed, it is broadcasted on the Bitcoin network. It will then be collected and
		recorded
		in a block. Each block, once constituted, will in turn be broadcasted.</p>

	<p>All these messages are public and verifiable. They make it possible to notify and therefore take to witness all
		the
		participants of the Bitcoin network on any new information that enriches the blockchain.</p>

	<p>Messages are transferred over the network in a binary format, encoding numbers on 32 bits or 256 bits using the
		Little-Endian convention.</p>

	<blockquote>
		<p>The Little-Endian convention sets the bytes from the lowest weight to the strongest weight, the Big-Endian
			convention sets the bytes from the strongest weight to the lowest weight. For example the number 1 is
			represented
			in hexadecimal on 32 bits by 00000001 with the Big-Endian convention and 01000000 with the Little-Endian
			convention.</p>

		<p>The number 1 on 32 bits with the Big-Endian convention:</p>

		<pre><code><span>  Byte 3 |  Byte 2 |  Byte 1 |  Byte 0</span>
			<span> --------+---------+---------+--------</span>
			<span>      00 |     00  |     00  |      01</span>
			</code></pre>

		<p>The number 1 on 32 bits with the Little-Endian convention:</p>

		<pre><code><span>  Byte 0 |  Byte 1 |  Byte 2 |  Byte 3</span>
			<span> --------+---------+---------+--------</span>
			<span>      01 |      00 |      00 |      00</span>
			</code></pre>
	</blockquote>

	<h3 id="agents">A multiple agents system</h3>

	<p>Each participant in the network uses a free open-source software that is both:</p>

	<ul>
		<li>a graphical user interface to manage a bitcoins wallet, i.e. a balance in bitcoins, and to make payments;
		</li>
		<li>an autonomous agent, that is to say a "bot" which reacts to the messages received from the other agents.
		</li>
	</ul>
	<p>The role of agents is to support this peer-to-peer network:</p>
	<ul>
		<li><strong>Broadcast messages</strong> by propagation. When connecting to the network, each agent randomly
			selects
			a pool of contact agents and distributes each received message to its contacts, which in turn will relay the
			message until it reaches all connected agents step by step. This mechanism offers high reliability, if
			messages
			are lost or delayed by some, they will still be propagated.</li>
		<li><strong>Copy locally the blockchain which is a transaction ledger</strong>, so that each participant can
			know
			the state of the blockchain, and inform his peers, so that anyone can leave or join the network at any time.
		</li>
		<li><strong>Implement the Bitcoin protocol</strong>.</li>
	</ul>



</body>

</html>