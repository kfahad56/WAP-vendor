/* eslint-disable */
import React, { Component } from 'react';
import './termspopup.css';
import './bootstrap.css';
import './responsive.css';
import './style.css';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';
export const TermsPopup = (props) => {
    const handleClose = () => {
        props.handleClose()
    }
    const handleAgree = () => {
        props.handleAgree()
    }
    // const classes = useStyles();
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
        <div>
            <Dialog fullScreen open={true} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className="appBar">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        {/* <Typography variant="h6" className="title">
                            Terms and conditions
                        </Typography> */}
                    </Toolbar>
                </AppBar>
                <section className="faq">
                    <div className="container">
                        <div className="sec-head mt-4">
                            <h2>Terms Of Services(Client)</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-12 privacy">
                                <h4>I.	DISCLAIMER</h4>
                                <p>PLEASE READ THIS AGREEMENT CAREFULLY BEFORE ACCEPTING THE TERMS OR ACCESSING THE WEBSITE. BY ACCEPTING THIS AGREEMENT, YOU ARE AGREEING TO BE BOUND BY THE TERMS OF THIS AGREEMENT. IF YOU DO NOT AGREE TO THE TERMS OF THIS AGREEMENT, DO NOT ACCESS THIS WEBSITE OR ACCEPT THE AGREEMENT.</p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>1.</b>  These terms and conditions create a contract between you and Hubshub Technology Service India Private Limited (“Hubshub Technology/the Company”). By agreeing to these terms and conditions or by accessing, downloading, installing or otherwise using the Website, you accept and agree to the terms and conditions herein. If you do not agree to any of these terms, then please do not use the Website or avail of the Services of Hubshub Technology.</li><br />
                                    <li><b>2.</b>  By accepting the terms of use of this Agreement, the Client agrees to be bound by its terms as if this Agreement were signed physically. If you are a Client, upon accepting the terms of use of this Agreement, you would receive a separate email from Hubshub Technology with the Commercial Terms which would form part and parcel of these terms and conditions/Agreement. </li><br />
                                    <li><b>3.</b>  In order to participate in certain other Services provided through the Website, You will be notified that You will be required to agree to additional terms and conditions contained in other such specific agreements. </li><br />
                                    <li><b>4.</b>  Hubshub Technology may modify this Agreement from time to time and such modification shall be effective immediately on such modification of this Agreement. You agree to be bound to any changes to this Agreement when you use the Services after any such modification is updated. It is therefore important that you review this Agreement regularly upon each use of the Services to ensure you are updated as to any changes to make an informed decision of agreeing to the terms or not. In the event that you disagree to the modified terms, the Agreement shall stand terminated only with prospective effect and all the Services and Warehouse Services and other logistics or technology support services undertaken prior to such date shall stand unaffected.</li><br />
                                    <li><b>5.</b>  This document is an electronic record in terms of the Information Technology Act, 2000 and rules there under in force, and the provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000 from time to time. This electronic record is generated by a computer system and does not require any physical or digital signatures for validation, consent or acceptance.</li><br />
                                </ul>
                                <h4>II.	DEFINITIONS</h4>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>1.</b>	APPLICABLE LAWS: “Applicable Laws” shall mean all applicable statutes, enactments laws, ordinances, judgment, orders, directives, rules and regulations, by-laws, notifications, guidelines and policies of any Authority, as may be in force and effect during the subsistence of this Agreement which shall be applicable to this Agreement and the Client, including but not limited to, any licence, permit or other governmental Authorization, in each case as in effect from time to time;</li><br />
                                    <li><b>2.</b>	AUTHORITY: “Authority” shall mean any national, supranational, regional or local government or governmental, administrative, fiscal, judicial, or government-owned body, department, commission, authority, tribunal, agency or entity;</li><br />
                                    <li><b>3.</b>	AUTHORIZATION: “Authorization” shall mean any consent, registration, filing, agreement, notarization, certificate, licence, approval, permit, authority or exemption from, by or with any Authority, whether given by express action or deemed given by failure to act within any specified time period;</li><br />
                                    <li><b>4.</b>	BUSINESS DAY: “Business Day” shall mean any calendar day (other than a Saturday or a Sunday) on which banks are open for general business in Durg, Chhattisgarh;</li><br />
                                    <li><b>5.</b>	CONFIDENTIAL INFORMATION: “Confidential Information” shall mean any and all information given by either party to the other party including but not limited to Client details, Consignment Notes, anything given in writing, specifically marked as confidential, shall be strictly kept confidential, by the other party in perpetuity even after termination/expiry of this Agreement. The only exception to this clause shall be in accordance with applicable law. The disclosing party shall have the option to demand destruction/return of the confidential information upon termination of this Agreement.</li><br />
                                    <li><b>6.</b>	CONSIGNMENT NOTE: “Consignment Note” shall refer to the information of the Goods to be dispatched to by the Client to the Partner or by the Partner, as the case maybe, which is to be provided by the Client to Hubshub Technology. Any reference to the term “Consignment Note” in this Agreement shall include delivery note, proof of delivery, invoice, advance shipping notice and all such other documents which would be applicable as per standard industry practice.</li><br />
                                    <li><b>7.</b>	COMMERCIAL TERMS: “Commercial Terms” shall refer to the agreement entered between Hubshub and the Client governing the commercial and payment terms which shall form part and parcel of this Agreement and which shall be made available to the Client either by email or through the Hubshub online portal. </li><br />
                                    <li><b>8.</b>	END CUSTOMER or CLIENT: “End Customer” or “Client” shall refer to the customer who shall be requiring warehousing and logistic services provided by Hubshub Technology through the Website, for Services and Storage Services or transporting of Goods under this Agreement as per the Commercial Terms.</li><br />
                                    <li><b>9.</b>	GOODS: “Goods” shall refer to the product or material that the Client wants to store in the Warehouse. The Client represents that these Goods are legal and lawful Goods only and that the Client is the sole &amp; legitimate owner of the tittle of the Goods. </li><br />
                                    <li><b>10.</b>	HUBSHUB TECHNOLOGY: "Hubshub Technology or Hubshub" shall mean Hubshub Technology Service India Private Limited, a private limited company incorporated under the Companies Act, 2013, an aggregator in the business of providing warehousing and logistics services to its customers who require such Services through an online electronic platform.</li><br />
                                    <li><b>11.</b>	INTELLECTUAL PROPERTY: “Intellectual Property” shall, unless otherwise agreed to in this Agreement, mean patents, trademarks, service marks, trade names and copyrights, and applications, licences and rights with respect to the foregoing, and all trade secrets, including know-how, inventions, designs, processes, works of authorship, manuals, documentation, computer programs and technical data and information.</li><br />
                                    <li><b>12.</b>	SERVICES: "Services" shall refer to any service offered or rendered by Hubshub Technology or its affiliates and includes warehousing and logistics services along with other technological, operational assistance and inventory management support services that are required by the Client.</li><br />
                                    <li><b>13.</b>	STORAGE SERVICES: “Storage Services” shall refer to the warehousing services offered by the Partner and accepted by the Client for storing Goods of the Client.</li><br />
                                    <li><b>14.</b>	PARTNER: “Partner” shall refer to a warehouse operator or any individual person or a legal entity who has represented to Hubshub Technology that it has the necessary experience and infrastructure to undertake any or all of the following required activities - receiving and dispatching goods, loading, unloading and storage of goods and management of Warehouse. The Partner has agreed to offer such Warehouses on behalf of Hubshub Technology.</li><br />
                                    <li><b>15.</b>	WEBSITE: "Website or Site" shall refer to www.hubshub.in or such other website Hubshub Technology notifies for the purposes of this Agreement. </li><br />
                                    <li><b>16.</b>	WAREHOUSE: “Warehouse” shall refer to the storage facility that the Partner is the true and legal owner, which is made available on the Hubshub platform for usage by Hubshub clients for warehousing or storage services. </li><br />
                                    <li><b>17.</b>	“We”, “Our”, and “Us” shall refer to Hubshub Technology.</li><br />
                                    <li><b>18.</b>	YOU/YOUR/USER: "You/Your/User" shall refer to the Client or any person who accesses, downloads, installs, utilizes, operates or views the Website or Services offered by Hubshub Technology.</li><br />
                                </ul>
                                <h4>III. PRIVACY POLICY</h4>
                                <p><b>A. Eligibility</b></p>
                                <p>You may use the Website only if you can form a contract with Hubshub Technology, and only in compliance with this Agreement and all Applicable Laws, rules and regulations. You must be at least 18 years old to use the Website and Services. By agreeing to this Agreement, you represent and warrant that you are 18 years of age or older. Any acceptance or use or access to the Website or Services by anyone under 18 is strictly prohibited and in violation of this Agreement. Any use of Hubshub’s Website or Services by ‘bots’ or other automated tools or methods is not permitted under this Agreement.  The Website and Services not available to any users previously removed from Website Site by Hubshub Technology.</p>
                                <p><b>B. Hubshub Technology Website</b></p>
                                <p>Subject to the terms and conditions of this Agreement, you are hereby granted a non-exclusive, limited, non-transferable, revocable license to use the Website for your use only and as permitted by the features of the Website. Hubshub Technology reserves all rights not expressly granted herein in the Website and the Hubshub Technology Content (as defined below). Hubshub Technology may terminate this license at any time without assigning any reason.</p>
                                <p><b>C. Hubshub Technology Accounts</b></p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>1.</b>	Your Hubshub Technology account gives you access to the Services and functionality that we may establish and maintain from time to time and in our sole discretion. If you accept the terms of this Agreement on behalf of a company, organization, or other entity, then (a) "You" includes you and that entity, and (b) you represent and warrant on each date that you use the Website that you are an authorized representative of the entity with the authority to bind the entity to this Agreement, and that you agree to this Agreement on the entity's behalf. </li><br />
                                    <li><b>2.</b>	You may never use another User's account without permission. When creating your account, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you are responsible for and must keep your account (including its password) secure. We encourage you to use "strong" passwords (passwords that use a combination of upper- and lower-case letters, numbers and symbols) with your account. You must notify Hubshub Technology immediately of any breach of security or unauthorized use of your account. Hubshub Technology will not be liable for any losses caused by any unauthorized use of your account.</li><br />
                                    <li><b>3.</b>	You may control your User profile and account settings by emailing us at contact@hubshub.in . By providing Hubshub Technology your email address, you consent to our using the email address to send you Website and Services related notices, including any notices required by law, in lieu of communication by postal mail. We may also use your email address to send you other messages, such as changes to features of the Website and Services and special offers. If you do not want to receive such email messages, you may opt out or change your preferences by emailing us at contact@hubshub.in. </li>
                                </ul>
                                <h4>V.	HUBSHUB TECHNOLOGY’S OBLIGATIONS</h4>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>1.</b>	Hubshub Technology is engaged in providing warehousing and logistics services via its Website wherein the Partner and Client have a platform to offer or access warehousing and logistics services along with other technological, operational assistance and inventory management support services. </li><br />
                                    <li><b>2.</b>	Hubshub Technology shall endeavor to facilitate the transaction between the Partner and the Client to the best of its ability, as per the agreed Commercial Terms. </li><br />
                                    <li><b>3.</b>	Hubshub Technology further provides Services such as inventory management and warehousing in various geographies from across States to have their Goods stored, loaded, transported and delivered. </li><br />
                                    <li><b>4.</b>	Hubshub Technology endeavors to undertake a complete and thorough check of the Storage Services facilities , approve and validate the same.</li><br />
                                    <li><b>5.</b>	Hubshub Technology shall further conduct regular inspections of the premises of the Partner where it provides Storage Services under this Agreement. </li><br />
                                    <li><b>6.</b>	Hubshub Technology shall, to the best of its ability and efforts, ensure quick and smooth transportation and deliveries of Goods, as agreed in the Commercial Terms. </li><br />
                                    <li><b>7.</b>	Hubshub Technology shall make available, either by e-mail or through its Hubshub online portal, the Commercial Terms to the Partner separately which agreement shall govern the commercial terms between the parties. </li>
                                </ul>
                                <h4>VI.	TERMS OF USE FOR CLIENTS</h4>
                                <p><b>1.</b>	The Client shall make and send a Consignment Note containing following information for the Goods to be dispatched to Partner using the electronic platform provided by Hubshub Technology or any other means agreed;</p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	Goods contained therein and its brief description;</li><br />
                                    <li><b>b.</b>	Unit of measurement and number of units;</li><br />
                                    <li><b>c.</b>	Expected date of arrival;</li><br />
                                    <li><b>d.</b>	Details of vehicle bringing the consignment.</li>
                                </ul>
                                <p><b>1.1.</b>	Consignment Note shall include delivery note, proof of delivery, invoice, advance shipping notice, additional instructions, and all such other documents which the Client undertakes to provide to enable Services to be performed under this Agreement. </p>
                                <p><b>2.</b> The Client shall prepare and deliver the Consignment Note to Hubshub Technology within such timeframes and by using such practices and methods as may be specified by Hubshub Technology from time to time in consultation with the Client.</p>
                                <p><b>3.</b> The Client shall dispatch to Partner such stock of Goods that requires warehousing or secondary distribution or as may be indicated by Client in writing or through electronic means as agreed With Hubshub Technology from time to time in the Commercial Terms. </p>
                                <p><b>4.</b> The Client shall from time to time require Partner to dispatch specified quantities of Goods or that are stored in the Warehouse to specified destinations or persons as instructed in writing or through electronic means as agreed With Hubshub Technology  from time to time by way of delivery orders.</p>

                                <p><b>5.</b> It is agreed by all the parties to this Agreement that the title and ownership in the Goods shall, at all times, vest with the Client and the Client shall have the right to enter into the Warehouse during standard business hours on prior written notice during the term of this Agreement in order to inspect the Goods stored in the Warehouse and to remove the same from the Warehouse.</p>

                                <p><b>6.</b> The Client shall take necessary insurance including but not limited to accident insurance, theft insurance, fire insurance, transit insurance and all such other insurances as may be applicable in relation tothis Agreement.</p>
                                <p><b>7.</b> The Client shall dispatch the Goods by suitable heavy or light commercial vehicle for Storage Services in the Warehouse. The Client shall take comprehensive insurance as may be deemed fit and necessary by them to protect their goods against all perils. In the event of any loss or damage to the goods, while the goods are in the care and custody of Partner, Partner shall render assistance to Client or Hubshub Technology to enable them to take their insurance claim.</p>
                                <p><b>8.</b> If required by Client, they should inform the Partner to repack the Goods in case if the packaging of the Goods is damaged, as may be informed by the Partner. The fresh packaging cost shall be provided by Client and is subject to the Commercial Terms agreement.</p>
                                <p><b>9.</b> The Client shall not hold Hubshub Technology responsible for any damage or delay caused by the Partner since the Client acknowledges that Hubshub Technology has to the best of its ability ensured that the Services under this Agreement are provided smoothly and efficiently without any hinderance. </p>
                                <p><b>10.</b>	The Client shall promptly pay all invoices raised by Partner or Hubshub Technology in accordance with Commercial Agreement. </p>
                                <p><b>11.</b>	The Client represents and warrants that they own the Goods or that they otherwise have the right and authority to the said Goods in accordance with this Agreement.</p>
                                <p><b>12.</b>	The Goods must not include any such goods which are prohibited or illegal or storage of which may detrimentally affect anything outside or violate in any way the laws of the Republic of India or any other Applicable Laws, rules, or regulations (Prohibited Goods). The Client shall fully indemnify Hubshub Technology in case such Prohibited Goods are being transported, stored and delivered and Hubshub Technology shall not be made liable or responsible for the acts or omission on part of the Client.</p>
                                <p><b>13.</b>	Hubshub Technology or its authorized representative may at any time without notifying the Client open to inspect the Goods if they: (i) believe, in its sole discretion, that the Goods may contain any Prohibited Goods; (ii) is required to do so by the police, fire services, local authorities or by court order; or (iii) considers it necessary, in its sole discretion, in an emergency or to prevent injury or damage to persons or property or both.</p>
                                <p><b>14.</b>	Hubshub Technology may refuse to store any Goods, or may return to the Client any Goods, at your cost, at any time, if, in Hubshub Technology’s sole discretion, the storage, or continued storage, of the Goods would represent a risk to the safety of any person or the security of the Warehouse, or any other goods stored at the Warehouse.</p>
                                <p><b>15.</b>	The Client acknowledges that the prices or information given in the Website is purely indicative in nature and is not a final quote. </p>
                                <p><b>16.</b>	The Client shall co-operate and assist Hubshub Technology in order to enable Hubshub Technology to provide the Services.</p>
                                <p><b>17.</b>	The Client undertakes to not disclose the Confidential Information received by it under this Agreement unless otherwise required by the law.</p>
                                <h4>VII. PROHIBITED USE</h4>
                                <p>As a condition of your acceptance to this Agreement, you will not use the Website for any purpose other than that which is lawful or is not prohibited by this Agreement or by any Applicable Law. Your usage of the Website is solely your responsibility. </p>
                                <p>You shall not, display, upload, modify, publish, transmit, update or share any information on the Website, that –</p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>(i)</b> Belongs to another person and to which you do not have any right;</li><br />
                                    <li><b>(ii)</b> Is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, libelous, invasive of another’s privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner;</li><br />
                                    <li><b>(iii)</b> Involves the transmission of "junk mail", "chain letters", or unsolicited mass mailing or "spamming" or unsolicited commercial advertisement; </li><br />
                                    <li><b>(iv)</b> Harms minors in any way;</li><br />
                                    <li><b>(v)</b> Infringes any patent, trademark, copyright or other proprietary rights;</li><br />
                                    <li><b>(vi)</b> Violates any law for the time being in force; </li><br />
                                    <li><b>(vii)</b> Deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature; </li><br />
                                    <li><b>(viii)</b> Impersonates another person;</li><br />
                                    <li><b>(ix)</b> Contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource.</li><br />
                                </ul>
                                <h4>VIII. LIMITATIONS ON LIABILITY</h4>
                                <p>WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE (IN CONTRACT, NEGLIGENCE OR OTHERWISE) WHERE:</p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	THERE IS NO BREACH OF A LEGAL DUTY OF CARE OWED TO YOU BY US;</li><br />
                                    <li><b>b.</b>	THE LOSS OR DAMAGE IS NOT A REASONABLY FORESEEABLE RESULT OF ANY SUCH BREACH; OR</li><br />
                                    <li><b>c.</b>	ANY LOSS OR DAMAGE OR INCREASE IN LOSS OR DAMAGE RESULTS FROM A BREACH BY YOU OF THESE TERMS AND CONDITIONS.THE MAXIMUM LIABILITY SHALL BE LIMITED TO THE EXTENT OF THE VALUE OF THE COMMERCIAL TERMS AND NOT THE COST OF THE GOODS, OR SERVICES AVAILED BY THE CUSTOMER, HUBSHUB TECHNOLOGY SHALL NOT BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL OR OTHER DAMAGES CAUSED TO THE USER.</li><br />
                                    <li><b>d.</b>	HUBSHUB TECHNOLOGY WILL NOT BE RESPONSIBLE OR HELD LIABLE FOR ANY DAMAGE CAUSED TO THE GOODS OR FOR ANY NON-PERFORMANCE ON PART OF THE PARTNER OR THE CLIENT, AS THE CASE MAYBE. ANY CLAIM ARISING OUT OF SUCH DAMAGE OR NON-PERFORMANCE WILL BE STRICTLY BETWEEN THE PARTNER AND THE CLIENT.</li><br />
                                </ul>
                                <p>WE ADDITIONALLY WILL NOT BE LIABLE IN CASE THE USER OF THE WEBSITE HAS MISREPRESENTED ANY OF THE INFORMATION PROVIDED BY THEM DURING THE USE PROCESS OR OTHERWISE. ANY AND ALL SERVICES PROVIDED BY US SHALL BE UNINTERRUPTED. HOWEVER, IN THE UNLIKELY EVENT OF AN INTERRUPTION IN SERVICES, WE SHALL NOT BE LIABLE OR RESPONSIBLE FOR ANY LOSS OR DAMAGE, HOWSOEVER CAUSED OR SUFFERED BY THE USER.  </p>
                                <p><b>1.</b>	Hubshub Technology shall not be held liable for any loss, damage or injury pertaining to use of the Website and Services offered under this Agreement and it shall be the sole risk of the User. The Website and Services provided by Hubshub Technology are provided on an "as is", "where is" and "as available" basis without any warranties or conditions (express or implied, including the implied warranties of merchantability, accuracy, fitness for a particular purpose, title and non-infringement, arising by statute or otherwise in law or from a course of dealing or usage or trade).</p>
                                <p><b>2.</b>	The User understands and agrees that Hubshub Technology is a technology platform through which warehousing and logistics services are facilitated and shall not hold Hubshub Technology responsible for any act or actions of any of the other third parties or other stakeholders involved in the transaction.</p>
                                <p><b>3.</b>	Hubshub Technology shall not be held responsible or liable for any theft, accident or burglary or any other incident of the Goods.</p>
                                <p><b>4.</b>	Hubshub Technology shall not be held responsible for any disputes between the Partner and the Client and You shall absolve Hubshub Technology of all liabilities and disputes that may arise amongst yourselves.</p>
                                <p><b>5.</b>	Hubshub Technology shall not be held responsible or liable for any of the service deficiency or any other deficiency or delay on part of the Partner availed through the Website.</p>
                                <p><b>6.</b>	Hubshub Technology shall not be held liable for any defect, damage or vulnerability in the Website, or for any injury or damage or loss to the User due to such defect, damage or vulnerability. </p>
                                <p><b>7.</b>	Hubshub Technology does not warrant that your access to the Website and/or related Services will be uninterrupted or error-free, that defects will be corrected or that this website or the server that makes it available, is free of viruses or other harmful components.</p>
                                <p><b>8.</b>	Access to and use of the Website and the information contained therein is at your own risk and Hubshub Technology does not undertake any accountability for any irregularities, viruses or damage to any mobile phone or electronic device that results from accessing, availing or downloading of any information from the application or any other website of which link is provided herewith. </p>
                                <p><b>9.</b>	Hubshub Technology shall not be held responsible for the confidentiality, secrecy and security of the personal or account information being sent through the Website for effecting the transaction.</p>
                                <p><b>10.</b>	Hubshub Technology does not warrant or make any representations regarding the use or the results of the use of any service availed in terms of its compatibility, correctness, accuracy, and reliability or otherwise. The User solely assume total responsibility and risk for your use of this Website and Website -related services.</p>
                                <p><b>11.</b>	Hubshub Technology shall not be held liable for any loss suffered by the user due to disclosure of the personal information to a third-party by Hubshub Technology, for reasons inclusive but not limited to participation in any telecommunication or electronic clearing network, in compliance with a legal directive, for statistical analysis or for credit rating.</p>
                                <p><b>12.</b>	Hubshub Technology does not warrant the confidentiality or security of the messages whether personal or otherwise transmitted through the Website or the Hubshub online portal. </p>
                                <p><b>13.</b>	Hubshub Technology makes no warranty or representation of any kind in relation to the system and the network or their function or performance or for any loss or damage whenever and howsoever suffered or incurred by the User or by any person resulting from or in connection with the Application.</p>
                                <p><b>14.</b>	Hubshub Technology shall be absolved of any liability in case there is any unauthorized use of the User's access to Website, or electronic device or for any fraudulent, duplicate or erroneous transaction initiated or requested or instructed by use of the User's Website.</p>
                                <p><b>15.</b>	The User agrees that, Hubshub Technology and its directors, officers, employees, agents, sponsors, consultants, business partners or other representatives shall not be responsible or liable for any direct, indirect, incidental, consequential, special, exemplary, punitive or any other damages (including without limitation loss of profits, loss or corruption of data, loss of goodwill, work stoppage, computer failure or malfunction or interruption of business) under any contract, negligence, strict liability or other theory arising out of or relating in any way with the use of the Website, Website Services or in reliance of the information available on the Website, Website-related Services or any products or Services offered or sold or displayed on this Website. If the foregoing limitation is held to be unenforceable, the maximum liability of Hubshub Technology and its service providers to the User shall not under any event exceed the amount of INR 5000 only.</p>
                                <p><b>16.</b>	The User fully and unconditionally agrees and understands that a possibility exists that the Website could include inaccuracies or errors and further that Hubshub Technology shall not be held liable for any such inaccuracies or errors. Additionally, a possibility exists that unauthorized additions, deletions or alterations could be made by third-parties to the Hubshub Technology. Although Hubshub Technology attempts to ensure the integrity, correctness and authenticity of the Website, Hubshub Technology makes no guarantees whatsoever as to the completeness, correctness or accuracy. In the event that such an inaccuracy arises, the User shall inform Hubshub Technology so that the same may be corrected.</p>
                                <p><b>17.</b>	It is the User's responsibility to maintain the confidentiality of their user account information, user account password, bank account information, including their password / PIN, safeguarding their money and any other activity including transactions that are posted to or made from your account. Hubshub Technology shall not be liable for any leak of information on the part of the User and the consequences of the same.</p>
                                <p><b>18.</b>	Neither Hubshub Technology nor the User will be liable for any delay or failure caused by conditions or events beyond the reasonable control of the respective party, including but not limited to any delay or failure due to any act of God, fire, act of terrorists, act of civil or military authorities, civil disturbance, war, strike or other labor dispute, interruption in telecommunications or internet services or network provider services, failure of equipment and/or software, other catastrophe or any other occurrence which is beyond reasonable control of the respective party and the validity and enforceability of any remaining provisions shall not be affected by any such condition.</p>
                                <h4>IX.	About Your Account:</h4>
                                <p><b>1. PROTECTION: </b></p>
                                <p>AS per the privacy policy of the Website You are responsible for maintaining the confidentiality of the account and password You have, so that You can restrict access to Your computer. In addition to that You also accept the responsibility of all the activities that occur under Your User account.</p>
                                <p><b>2. Wrong information</b></p>
                                <p>You represent that the information provided by You only relates to You and not to any third party. Usage of false information or misrepresenting to be a third person/impersonation shall result in us removing all of Your content and at our sole discretion We may choose to not provide services/products to You through our Website.</p>
                                <p><b>3. Indemnification</b></p>
                                <p>The User agrees to indemnify, defend and hold harmless Hubshub Technology from and against any and all losses, liabilities, claims, damages, costs and expenses (including legal fees and disbursements in connection therewith and interest chargeable thereon) asserted against or incurred by Hubshub Technology that arise out of, result from, or may be payable by virtue of, any breach or non-performance of any representation, warranty, covenant or agreement made or obligation to be performed by the User pursuant to this Agreement.</p>
                                <p><b>4. Limited user</b></p>
                                <p>The User agrees and undertakes not to sell, trade or resell or exploit for any commercial purposes, any portion of the products or services, without Hubshub Technology’s prior written consent. </p>
                                <p><b>5. Termination </b></p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	Either party may terminate this Agreement by giving to the other party a prior notice in writing without assigning any reasons thereof as per the notice period mentioned in the Commercial Terms.  </li><br />
                                    <li><b>b.</b>	The Client agrees not to terminate this Agreement unilaterally and without affording any justifiable reasons in writing to Hubshub Technology. Any such notice of termination shall be made in writing and Hubshub Technology has the sole discretion to either accept such termination or not depending on the movement of the Goods and various other factors.</li><br />
                                    <li><b>c.</b>	Without prejudice to the other rights of Hubshub Technology under this Agreement or otherwise, this Agreement may be terminated forthwith upon or at any time after the happening of any of the following events:</li><br />
                                    <li><b>i.</b>	If the Client be adjudicated as insolvent;</li><br />
                                    <li><b>ii.</b>	If any attachment in execution of a decree or award passed against the Client is levied upon Goods in possession of Partner;</li><br />
                                    <li><b>iii.</b>	If the Client fail to observe and perform any of the terms and conditions contained in this Agreement.</li><br />
                                    <li><b>d.</b>	In the event of early termination of this Agreement as mentioned in this clause hereinabove, the Goods lying in custody of Partner will be forthwith handed over to the custody of Client, supported by the statement of accounts duly acknowledged by both the parties.</li><br />
                                    <li><b>e.</b>	Provided further, that on termination on the grounds contained in this clause hereinabove, Hubshub Technology reserves its rights to adjust any financial loss suffered by it for reason of breach of the terms of this Agreement against the amount payable by Hubshub Technology to Client. Notwithstanding anything mentioned in this agreement, neither Party shall in any event be liable one to the other for their respective consequential damage arising out of loss, damage and delay, including but not limited to indirect losses and loss of revenue, profit or anticipated profits whether or not due in whole or in part to the negligence or breach of duty, statutory or otherwise, of the other party.</li><br />
                                    <li><b>f.</b>	Provided further that no transaction which has taken place prior to the termination shall stand terminated unless otherwise agreed upon by Hubshub Technology.</li><br />
                                    <li><b>g.</b>	Hubshub Technology reserves the right, in its sole discretion, to terminate the access to the Website and the related services or any portion thereof at any time, without notice. </li><br />
                                </ul>
                                <p><b>6. Relationship</b></p>
                                <p>None of the provisions of this Agreement, terms and conditions, notices or the right to use the Website  by the User contained herein or any other section or pages of the Website  and/or the linked sites, shall be deemed to constitute a partnership between the Client and Hubshub Technology and no party shall have any authority to bind or shall be deemed to be the agent of the other in any Way. </p>
                                <p><b>7. Rights of Intellectual Property</b></p>
                                <p><b>a. Copyright: </b>All the contents like list of warehouses, customer information, trade secrets, technical know-how, information related to the transactions etc. is the property of Hubshub Technology and is completely protected by Indian law of Copyright. The content is also the exclusive property of Hubshub Technology.</p>
                                <p><b>b. Trademarks:</b></p>
                                <p><b>c. Protected Marks: </b>The protected marks include (Website) &amp; design and other things that are contained in the Website.</p>
                                <p><b>d. </b>All other Intellectual Property (as defined by Applicable Laws) relating to the products/services and other content available on the Website or provided offline either by Hubshub Technology or Partners shall be the sole property of Hubshub Technology and may not be used by the User without prior written consent of Hubshub Technology.</p>
                                <p><b>Posting content on the Website:</b></p>
                                <p><b>8. User Content License: </b></p>
                                <p>Some parts of the Website may allow You to post photos, videos, comments, feedback and other content, which we refer to as “User Content.”  Hubshub Technology is not responsible for User Content others post on the Website. User Content is owned by You or whoever created it, but when You post User Content You license it to Hubshub Technology as described below:</p>
                                <p>You represent that You have the right to post your User Content, and You grant Hubshub Technology a non-exclusive, perpetual, transferable, sub-licensable, royalty-free, worldwide license to use any of the User Content that You post on or in connection with the Website, including the likeness of any person that appears in the User Content, or any of the concepts or ideas contained in the User Content, for any purpose, including commercial use, which includes the right to translate, display, reproduce, modify, create derivative works, sublicense, distribute and assign these rights. Hubshub Technology may, in its sole discretion, remove any User Content at any time.  </p>
                                <p>You understand that deleted User Content may persist in Hubshub Technology’s systems and on the Platform to the extent your User Content has been publicly posted or shared with others who have not deleted it, unless You or the relevant individual request deletion or blocking of personal data in accordance with applicable law. </p>
                                <p><b>9. LICENSE TO USE COMMENTS, FEEDBACK AND IDEAS: </b></p>
                                <p>You understand that any comments, feedback, or ideas You send us are provided on a non-confidential basis and You grant to Hubshub Technology a perpetual, worldwide license to use all comments, feedback and ideas You may share with us, without notice, compensation or acknowledgement to You, for any purposes whatsoever, including, but not limited to, developing, manufacturing and marketing products and services and creating, modifying or improving products and services. </p>
                                <p><b>10. Disclaimer</b></p>
                                <p>HUBSHUB TECHNOLOGY DOES NOT WARRANT OR REPRESENT THAT THE MATERIAL ON THIS WEBSITE IS ACCURATE, COMPLETE OR CURRENT OR THAT THE WEBSITE WILL BE FREE OF DEFECTS OR VIRUSES THOUGH DUE CARE IS CONSTANTLY TAKEN ON THE PART OF HUBSHUB TECHNOLOGY. NOTHING CONTAINED IN THE PAGES OF THIS WEBSITE SHOULD BE CONSTRUED AS LEGAL, MEDICAL, COMMERCIAL, OR OTHER PROFESSIONAL ADVICE. DETAILED PROFESSIONAL ADVICE SHOULD BE OBTAINED BEFORE TAKING OR REFRAINING FROM ANY ACTION BASED ON ANY OF THE INFORMATION OR MATERIAL CONTAINED IN THIS WEBSITE OR ANY COMMUNICATIONS PROVIDED TO YOU AS A RESULT OF YOUR REGISTRATION. IT IS YOU AS A CUSTOMER WHO AGREES THAT THE USE OF THIS SITE IS SOLELY AT YOUR OWN RISK.</p>
                                <p><b>11. Third party rights</b></p>
                                <p>Nothing in this Agreement is intended to nor shall confer a benefit on any third party and any person who is not a party to this Agreement has no rights to enforce them.</p>
                                <p><b>12. Waiver</b></p>
                                <p>No delay or decision not to enforce rights under this Agreement will constitute a waiver of the right to do so and will not affect rights in relation to any subsequent breach. If You encounter any error while viewing any file/ document, kindly notify us of the same at the earliest either by mail or phone.</p>
                                <p><b>13. Information Technology Act</b></p>
                                <p>Certain laws in India prohibit and impose restriction on use of the Website  and You are advised to make familiar with those laws and not to post any information or messages that are, or that may be construed, as being malicious, slanderous, pornographic, defamatory, inappropriate or that makes attacks on or comments on any individuals or groups of individuals, educational institutions or any other entities whatsoever (whether companies, firms, or any other institutions). </p>
                                <p>You also agree to not post any information to which You do not have copyright and/or other appropriate permissions to post in public forum.</p>
                                <p>Your failure to comply with these terms may result in removal of Your postings without prior notice as a User. The IP address of all posts is recorded to aid in enforcing these conditions.</p>
                                <p><b>14. Notice</b></p>
                                <p>Registered post or Courier, with delivery receipt and acknowledgement wherever applicable, or E-mail communication shall be accepted, as a valid notice by one party to another. </p>
                                <p><b>15. Force Majeure</b></p>
                                <p>In the event of any failure or delay in performance of any obligation under this Agreement due to the event of Force Majeure which shall for purpose of the agreement include but not be limited to public enemy, fire, earthquakes, storms, typhoons and floods, war, blockage, political intervention, strike, disturbances, riots, lockouts, labor disputes, landslides, epidemics or pandemic including COVID-19, sabotage and change in law or regulation or other Government action directly affecting this agreement or any other cause beyond a party's control. In such events, the parties shall discuss and exercise their best endeavors to agree for rescheduling such performance and the party failing or delaying shall to that extent during the period of such event of Force Majeure be exempted from the liabilities that would otherwise result from its delay or failure.</p>
                                <p><b>16. Headings</b></p>
                                <p>The headings and subheadings herein are included for convenience and identification only and are not intended to describe, interpret, define or limit the scope, extent or intent of this Agreement contained herein or any other section or pages of the Website or any Linked Sites in any manner whatsoever.</p>
                                <p><b>17. Dispute Resolution</b></p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b> All disputed arising out of or in connection with this agreement shall be attempted to be settled through negotiation between senior management of both the parties. If any Dispute arising between the Parties is not amicably settled within one month of commencement of attempt to settle the same, the Disputes shall be referred to arbitration under the provisions of the Indian Arbitration and Conciliation Act 1996 and amendments thereof from time to time. The parties agree that the Arbitration proceedings will be conducted in Raipur, Chhattisgarh and the panel of Arbitration shall consist of sole arbitrator appointed by the Parties mutually and the language shall be English.</li><br />
                                    <li><b>b.</b> The Parties agree that this Agreement shall be construed and legal relations between them shall be determined, in accordance with the laws of India and the courts of Raipur, Chhattisgarh shall have the non-exclusive jurisdiction for settlement of any disputes that may arise under this Agreement.</li><br />
                                </ul>
                                <p><b>18. Acceptance of Terms and Conditions</b></p>
                                <p>By using our Website and accepting the terms of this Agreement, You agree to be bound by these terms and conditions and privacy policy set forth above including any additions and future modifications. If at any time You do not agree to these terms and conditions, You may notify us of Your intention and refrain from accessing our Website.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="faq">
                    <div class="container">
                        <div class="sec-head mt-4">
                            <h2>Privacy Policy</h2>
                        </div>
                        <div class="row">
                            <div class="col-md-12 privacy">
                                <p>We, Hubshub Technology Service India Private Limited, incorporated under the Companies Act, 1956/2013 (hereinafter referred to as “Company”), having registered office at House No. 36, Mohan Nagar, Durg, CT 491001, India, the creator of this Privacy Policy ensure our firm commitment to your privacy vis-à-vis the protection of your priceless information. In order to endow you with our uninterrupted use of services, we may collect and, in some circumstances, disclose information about you. To enhance better protection of your privacy we provide this notice explaining our information practices and the choices you can make about the way your information is collected and used.</p>
                                <p>All visitors to <a href="https://www.hubshub.in"> www.hubshub.in </a>(Website) are advised to read and understand our Privacy Policy carefully, as by accessing the Website you agree to be bound by the terms and conditions of the Privacy Policy and consent to the collection, storage and use of information relating to you as provided herein.</p>
                                <p>If you do not agree with the terms and conditions of our Privacy Policy, including in relation to the manner of collection or use of your information, please do not use or access the Site.</p>
                                <p>If you have any questions or concerns regarding this privacy policy, you should contact our customer support desk at <a href="https://www.hubshub.in"> www.hubshub.in </a></p>
                                <h4>1. Definitions:</h4>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	“We”, “Our”, and “Us” shall mean and refer to the creators of this privacy policy.</li><br />
                                    <li><b>b.</b>	“You”, “Your”, “Yourself” and “User” shall mean and refer to natural and legal individuals including service providers and service seekers who use the Website.</li><br />
                                    <li><b>c. </b>Website” shall mean and refer to <a href="https://www.hubshub.in"> www.hubshub.in </a> created by Us. </li><br />
                                    <li><b>d.</b>	“Personal Information” shall mean and refer to any personally identifiable information that We may collect from You.	</li><br />
                                    <li><b>e.</b>	“Third Parties” refer to any website, company or individual apart from the User and the creator of the Website.</li><br />
                                    <li><b>f.</b>	“Services” shall mean the services provided by the Company on the Website.</li><br />
                                </ul>

                                <h4>2.	The Information that is collected</h4>
                                <p>When You sign up for a Hubshub Technology account and want to avail the services that are offered by our Website, we safely store all the information that is provided by You in accordance with applicable laws. We make use of an order form whereby we provide the opportunity to our customers to request for information, products &amp; services. We also collect the contact information (email address &amp; mobile number) of our visitors along with the financial information (credit card &amp; debit card). The financial information is not stored by us whatsoever. We use contact information to send orders to the customers along with the information of our entity. The information can also be used to communicate with the customers, as and when need arises. The mailing and promotional calls can be stopped by the user if required by following the steps given in Choice/Opt-out below.</p>
                                <p>The information of Your browser along with Your IP address is stored in the form of “cookie”. This makes it easy for us to identify You and the shopping cart with added products &amp; services. Cookie is a tiny data file which is store in Your hard drive. Cookie file neither read stored in Your hard drive nor read the other cookie file. You can reject the storage of the cookie in Your hard drive by simply switching off this option in Your browser. For purchasing, it’s not necessary to switch on the cookie in the browser option.</p>
                                <p>A cookie is a piece of software code that an internet website sends to Your browser when you access information at that site. A cookie is stored as a simple text file on Your computer or mobile device by a website’s server and only that server will be able to retrieve or read the contents of that cookie. Cookies let you navigate between pages efficiently as they store your preferences, and generally improve Your experience of a website. <a href="https://www.hubshub.in"> www.hubshub.in</a> may use following types of cookies to enhance Your experience and interactivity:</p>

                                <h4>DOES HUBSHUB CONSOLIDATE PERSONAL INFORMATION?</h4>
                                <p>Hubshub may consolidate the personal information of customers who use Hubshub Web sites. We use this information to help us better design Hubshub Web sites and Hubshub products, to communicate information to you, to enhance our marketing and research activities, and to facilitate other business functions.</p>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	Analytics cookies for anonymously remembering your computer or mobile device when You visit our Website to keep track of browsing patterns.</li><br />
                                    <li><b>b.</b>	Service cookies for helping us to make our Website work efficiently, remembering Your registration and login details, settings preferences, and keeping track of the pages You view.</li><br />
                                    <li><b>c.</b>	Non-persistent cookies a.k.a per-session cookies. Per-session cookies serve technical purposes of providing seamless navigation. These cookies do not collect personal information on users and they are deleted as soon as You leave our website. The cookies do not permanently record data and they are not stored on Your computer’s hard drive. The cookies are stored in memory and are only available during an active browser session. Again, once You close your browser, the cookie disappears.</li><br />
                                </ul>
                                <h4>3.	Uses of the collected information</h4>
                                <p>In order to improve the online customer experience, Hubshub Technology makes use of the information collected. Thus, when You sign in, it authenticates You and send notification through email. Your request can be fulfilled for different product
                                &amp; services. We will use the information for sending order confirmations, dispatch confirmation and other communication that we may need to have with You in the process of the transaction. Information is also used for capturing data insights for internal and external clients and can be used by Hubshub Technology to fulfil orders, improve overall User experience. You consent to us sending you emails/SMS updates of our products/services from time to time either directly or through third party service providers. You may always opt out of such marketing updates at a later point in time. All such information solely belongs to Hubshub Technology.</p>

                                <h4>4.	Sharing of Information</h4>
                                <p>You can be assured that Hubshub Technology does not believe in sharing any personal information with any individual, company or organization. Information is only shared if we have consent from Your end.</p>
                                <p>We from time to time engage with reliable third parties that also accept our terms &amp; conditions and sign a confidentiality agreement to bolster the confidentiality requirements. These third parties are engaged to improve Your experience and for advertising, primarily.</p>
                                <p>We also undertake to respond to court orders or any other legal processes in order to exercise or establish the legal rights for defending any claims.</p>
                                <p>We may also disclose the information of those customers who may come in terms of suspicion for any fraud or illegal transaction. Then their information will be used for legal processes or investigation by the court.</p>
                                <p>This Website may have pop-ups of other websites and the information given to them is not our responsibility. Our Website may contain links to other websites s. Our terms, privacy policy applies only to our Website. If You click on a link to another website, you are requested to read their privacy policy, terms.</p>

                                <h4>5.	Data integrity</h4>
                                <p>Hubshub Technology collected the customer’s personal information and processes it in accordance with the privacy policy. We ensure that the data we collected, stored for different process practices needed to provide the meaningful online service to You. Thus, we request You to provide the data as accurate as possible.</p>

                                <h4>6.	Security &amp; Confidentiality</h4>
                                <p>Hubshub Technology restricts access of the personal information to the employees, moderator, contractors and agents for updates, delivery and for improvement of the product and services. They have to abide to the confidentiality agreement failing which they will be terminated.</p>
                                <p>We make use of the best security measures for the protection against the misuse, loss of information that is under our control. We go through the SSL secure commerce server which uses the military grade encryption to protect all the information with specific codes. Each customer is important to us and We consider their approval with due respect.</p>

                                <h4>7.	Choice/Opt-out</h4>
                                <p>Customers can unsubscribe the email at any point of time according to their desire by following the suggestion given at the bottom of the Hubshub Technology email/newsletter.</p>

                                <h4>8.	Your data protection rights include:</h4>
                                <ul style={{ listStyle: "none" }}>
                                    <li><b>a.</b>	The right to access – You have the right to request Hubshub Technology for copies of your personal data. We may charge you a small fee for this service.</li><br />
                                    <li><b>b.</b>	The right to rectification – You have the right to request that Hubshub Technology correct any information you believe is inaccurate. You also have the right to request Hubshub Technology to complete the information you believe is incomplete.</li><br />
                                    <li><b>c.</b>	The right to erasure – You have the right to request that Hubshub Technology erase your personal data, under certain conditions.</li><br />
                                    <li><b>d.</b>	The right to restrict processing – You have the right to request that Hubshub Technology restrict the processing of your personal data, under certain conditions.</li><br />
                                    <li><b>e.</b>	The right to object to processing – You have the right to object to Hubshub Technology’s processing of your personal data, under certain conditions.</li><br />
                                    <li><b>f.</b>	The right to data portability – You have the right to request that Hubshub Technology transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li><br />
                                </ul>

                                <h4>9.	Changes to our policy</h4>

                                <p>We keep our privacy policy and terms and conditions under regular review and place any updates on the Website and Application. This policy and the terms were last updated on Sept 25, 2020</p>
                                <h4>10.	Contacting Hubshub Technology</h4>
                                <p>If there are any changes that You would like to make in Your current information, then do remove Your previous contact details so that You don’t get any updates in Your old contacts. You can also be with us through the following contacts:</p>
                                <p>Email: <a href="mailto:contact@hubshub.in"> contact@hubshub.in</a></p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                <DialogActions>
                    <div onClick={handleAgree} className="btn" color="primary">
                        I Accept
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default TermsPopup;