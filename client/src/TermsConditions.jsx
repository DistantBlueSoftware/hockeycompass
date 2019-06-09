import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

class TermsConditions extends React.Component {
  
  componentDidMount() {
      this.props.routeChange('/terms');
  }
  
  render() {
    return (
      <div className='container-fluid' style={{padding:'20px'}}>
        <h1>Terms and Conditions of Website Use</h1>
        <p>Welcome to www.hockeycompass.com. This website (the “Website”) is owned, controlled and operated by Hockeycompass, LLC, a Minnesota LLC (the “Company”). This Agreement describes the terms and conditions applicable to your use of our services at the Website. Please read this Agreement carefully before accessing or using the Website. This Agreement spells out what you can expect from us and what we expect from you. In accessing, browsing and/or using any area of the Website, you acknowledge that you have read, understand, and agree to be bound by the terms and conditions set forth in this Agreement. We may make revisions to this Agreement from time to time. By using the Website, you agree to be bound by such revisions and should therefore periodically visit this page to determine the then current version of this Agreement to which you are bound. The Company will inform existing users when this Agreement is revised by posting a Notice of Change on our homepage. If you do not agree to the terms and conditions under this Agreement, do not use the Website. </p>
        <h3>1. Restrictions on Use of Materials. </h3>
        <p>(a) Licensing, Eligibility, and Use of the Website. For a limited time, the Website is granting its registered users a free, non-exclusive license together with the authority to use its services and technology (the “Technology”). The Company reserves the right to charge fees for using the Technology in the future. If the Company ever decides to charge fees to use the Website, registered users would be notified of the fees in advance and would be given the opportunity to decline continuing their use before fees were charged. No registered user will be charged a fee by the Company without the user’s prior express consent. 
        You understand and agree that the Website is provided “as-is” and that the Company assumes no responsibility for the timeliness, deletion, misdelivery or failure to store any user communications or personalization settings, if any. You may not copy, modify, redistribute, sell, sublicense, assign transfer, decompile, reverse engineer, disassemble or otherwise reduce the Technology to a humanly perceivable form without our prior written consent. 
        The Company will employ reasonable measures to protect the security of users and user information, but makes no warranty with respect to the data posted on the Website, including but not limited to, statistical data, news and information. The Website assigns internal user IDs that are utilized to ensure that each user’s unique information is properly linked within the Website universe. 
        You must be 18 or over, or the legal age to form a binding contract in your jurisdiction if that age is greater than 18 years of age, to register with us or use the Site and the Services. If you are between the ages of 13 and 18 or the applicable legal age in your jurisdiction, you can use the Site or Services only in conjunction with, and under the supervision of, your parent or guardian who has agreed to the Terms of Use. If you are under the age of 13, you may not use the Site or Services, in compliance with the Children's Online Privacy Protection Act. If you are the parent or legal guardian of a child under the age of 18, you may use the Site or Services on behalf of such minor child. By using the Site or Services on behalf of a minor child, you represent and warrant that you are the parent or legal guardian of such child. If you do not qualify under these terms, do not use the Site or Services. Membership in the Services is void where prohibited by applicable law, and the right to access the Site is revoked in such jurisdictions. By using the Site and/or the Services, you represent and warrant that you have the right, authority, and capacity to enter into these Terms of Use and to abide by all of the terms and conditions set forth herein. The Site is administered in the U.S. and intended for U.S. users; 
        any use outside of the U.S. is at the user's own risk and users are responsible for compliance with any local laws applicable to their use of the Services or the Site. </p>
        <p>(b) Trademarks. The trademarks, service marks, and logos (collectively “Trademarks”) used and displayed on the Website are registered and unregistered marks owned by the Company, its affiliates or others. Nothing on the Website should be construed as granting by implication, estoppel, or otherwise, any license or right to use any Trademark displayed on the Website without the prior written permission of the Company The Company aggressively enforces its intellectual property rights to the fullest extent of the law. The name of the Company and the Company logo may not be used in any way, including in advertising or publicity pertaining to distribution of materials on the Website, without the prior written permission of the Company. The Trademarks may not be used (i) to identify products or services that are not the Company’s, (ii) in any manner likely to cause confusion, (iii) in or as a part of your own trademarks, (iv) in a manner that implies that the Company sponsors or endorses your products or services or (v) in any manner that disparages or discredits the Company. </p>
        <p>(c) Copyright Notice. You acknowledge that the Website contains information, data, software, text, photographs, images, graphs, audio and video clips, typefaces, graphics, music, sounds, button icons, logos and other material (collectively “Company Content”) that are protected by copyrights, trademarks, trade secrets, or other proprietary rights, and that these rights are valid and protected in all forms, media and technologies existing now or hereafter developed. All Company Content is copyrighted as a collective work under the U.S. copyright laws, and the Company owns a copyright in the selection, coordination, arrangement, and enhancement of such Company Content. You may not modify, remove, delete, augment, add to, publish, transmit, participate in the transfer or sale of, create derivative works from, or in any way exploit any of the Company Content or any material from any website owned, operated, licensed or controlled by the Company, in whole or in part, except as expressly permitted by Section 1(a) of this Agreement. You may not put any the Company graphics or text on your own web page. If no specific restrictions are displayed, you may make copies of select portions of the Company Content, provided that the copies are made only for your personal use and that you maintain any notices contained in the Company Content, such as all copyright notices, trademark legends, or other proprietary rights notices. Except as provided in the preceding sentence or as permitted by the fair use privilege under the U.S. copyright laws (see, e.g., 17 U.S.C. Section 107), you may not upload, post, reproduce, or distribute in any way Company Content protected by copyright, or other proprietary right, without obtaining permission of the owner of the copyright or other proprietary right. 
        Without limiting the generality of the foregoing, use of any software Company Content shall be governed by the service agreement accompanying such software. 
        You must receive our express written consent to use the Website materials for commercial purposes. In order to obtain that consent, please send an e-mail to maksim.ardashnikov@hockeycompass.com with the following information: (i) your name, position, organization, address and telephone number; (ii) a description of the Website content, text or graphics you want to use; (iii) where, how and when you will be using the materials; (iv) to whom the materials will be distributed, in what quantities and for what purpose; and (v) other information that will be included with the Website material. We will respond by e-mail and inform you whether or not we grant permission for your use of the material. This decision will be made at our sole discretion. </p>
        <p>(d) Limited License. You may include a text link to any portion of the Website on your web site. If you would like to use a graphic link, click below to receive a limited license to use the Website logo only for the purpose of creating such a link. You may not change the appearance of the logo, or any trademarks used in connection with the logo, in any way. You will replace or remove a 
        logo that the Company determines is not an appropriate display or use of one of the Company’s Trademarks. </p>
        <p>(e) User Conduct. You understand that all information, data, text, graphics, messages or other materials, whether publicly posted or privately transmitted by a user of the Website (“User Content”), are the sole responsibility of the person from which such User Content originated. This means that you, and not the Company, are entirely responsible for all User Content that you upload, post, email or otherwise transmit to or via the Website. The Company does not control the User Content posted via the Website and, as such, does not guarantee the accuracy, integrity or quality of such User Content. You understand that by using the Website, you may be exposed to User Content that is offensive, indecent or objectionable. Under no circumstances will the Company be liable in any way for any User Content, including, but not limited to, any errors or omissions in any User Content, or any loss or damage of any kind incurred as a result of the use of any User Content posted, emailed or otherwise transmitted via the Website. </p>
        You agree to not use the Website to: 
        (i) upload, post, email or otherwise transmit any User Content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another’s privacy, hateful, or racially, ethnically or otherwise objectionable; 
        (ii) harm minors in any way; (iii) impersonate any person or entity, including, but not limited to, a representative of the Company, or falsely state or otherwise misrepresent your affiliation with a person or entity; 
        (iv) forge headers or otherwise manipulate identifiers in order to disguise the origin of any User Content transmitted to or through the Website; 
        (v) upload, post, email or otherwise transmit any User Content that you do not have a right to transmit under any law or under contractual or fiduciary relationships (such as inside information, proprietary and confidential information learned or disclosed as part of employment relationships or under nondisclosure agreements); 
        (vi) upload, post, email or otherwise transmit any User Content that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party; 
        (vii) upload, post, email or otherwise transmit any unsolicited or unauthorized advertising, promotional materials, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” or any other form of solicitation; 
        (viii) upload, post, email or otherwise transmit any material that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; 
        (ix) interfere with or disrupt the Website or servers or networks connected to the Website, or disobey any requirements, procedures, policies or regulations of networks connected to the Website; 
        (x) intentionally or unintentionally violate any applicable local, state, national or international law, including, but not limited to, regulations promulgated by the U.S. Securities and Exchange Commission, any rules of any national or other securities exchange, including, without limitation, the New York Stock Exchange, the American Stock Exchange or the NASDAQ, and any regulations having the force of law; 
        (xi) “stalk” or otherwise harass another; or (xii) collect or store personal data about other users. 
        You acknowledge that the Company does not pre-screen User Content, but that the Company and its designees shall have the right (but not the obligation) in their sole discretion to refuse or move any User Content that is available via the Website. Without limiting the foregoing, the Company and its designees shall have the right to remove any User Content that violates the Terms of Use or is otherwise objectionable. You agree that you must evaluate, and bear all risks associated with, the use of any Content, including any reliance on the accuracy, completeness, or usefulness of such User Content. In this regard, you acknowledge that you may not rely on any Content created by the Company’s users or submitted to the Website, including without limitation information in any Company or user created Discussion Forum and in all other parts of the Website. 
        You acknowledge and agree that the Company may preserve User Content and may also disclose User Content if required to do so by law or in the good faith belief that such preservation or disclosure is reasonably necessary to: (i) comply with legal process; (ii) enforce the Terms of Use; (iii) respond to claims that any Content violates the rights of third-parties; or (iv) protect the rights, property, or personal safety of the Company, its users and the public. 
        You understand that the technical processing and transmission of the Website, including your User Content, may involve (i) transmissions over various networks; and (ii) changes to conform and adapt to technical requirements of connecting networks or devices. 
        <h3>2. Creative and Content Submissions from or by Users.</h3> 
          <p>The Website is happy to hear from its users and welcomes your comments and suggestions regarding the Website’s products and services. However, if you send us any creative materials, including creative suggestions, ideas, notes, drawings, concepts or other information (collectively “Information”), such Information shall be deemed, and shall remain, the property of the Company. None of the Information shall be subject to any obligation of confidence on the part of the Company, and the Company shall not be liable for any use or disclosure of any Information. Without limitation of the foregoing, the Company shall exclusively own all now known or hereafter existing rights to the Information of every kind and nature throughout the universe, and shall be entitled to unrestricted use of the Information for any purpose whatsoever, commercial or otherwise, without compensation to the provider of the Information. 
        By posting messages, uploading files or inputting data on the site, you grant (or represent and warrant that the owner of such information grants) the Website a royalty-free, perpetual, non-exclusive, worldwide license to use, copy, modify, adapt, transmit, translate, create derivative works from or display any of the Information and sublicense to third parties the unrestricted right to exercise any of the foregoing rights granted with respect to such Information. The Website may contain bulletin boards, email, chat rooms, forums or other public posting areas (collectively “Communication Tools”). While the Website does not monitor the message, information, files or data posted on the site or transmitted using the Communication Tools, it may edit, refuse to post or remove any information or materials, in whole or part, that in the Website’s sole discretion are objectionable, in violation of these Terms of Use, or for any other reason (See Section 1(e) of this Agreement for examples of such content). </p>
        <h3>3. Representations and Warranties. </h3>
        <p>You represent and warrant to the Company that you will fully comply with this Agreement. If you choose to post material to any portion of the Website or to submit any Information to the Website, you further represent and warrant to the Company that such materials are not subject to any copyright, proprietary or intellectual property rights, or that you have obtained express authorization from the holder of such rights to distribute such materials on the Website. By posting materials to any portion of the Website, you automatically grant (or warrant that the owner of such rights has expressly granted) the Company a perpetual, royalty-free, irrevocable, nonexclusive right and license to use, reproduce, modify, adapt, publish, translate, creative derivative works from and distribute such materials or incorporate such materials into any form, media or technology now known or later developed throughout the universe. In addition, you warrant that all “droit moral” rights in any such materials have been waived. </p>
        <h3>4. Indemnification.</h3> 
          <p>You hereby agree to indemnify, defend and hold the Company, its affiliated companies, and all officers, directors, owners, agents, information providers, affiliates, licensers and licensees (collectively, the “Indemnified Parties”) harmless from and against any and all liabilities and costs, including, without limitation, attorneys’ fees, incurred by such Indemnified Parties in connection with any claim arising out of any breach by you of this Agreement or the foregoing representations, warranties and covenants. You shall use your best efforts to cooperate with the Company in the defense of any claim. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you. </p>
        <h3>5. Termination.</h3> 
          <p>You may terminate this license at any time by ceasing to access and use the Website, although you shall remain bound by this Agreement with respect to any past use of the Website. The Company may continue to display the content you have on your online community pages at the time of termination unless you specifically request that the Company remove your online community pages. The Company may at its sole discretion terminate this license at any time, with or without prior notification, in the event you fail to comply with the terms and conditions of this Agreement or for any other reason that the Company believes, in its sole discretion, is appropriate, by deactivating your user name and password and/or suspending operation of the system. Upon termination, you must destroy all materials obtained from the Website and any and all other Company sites, and all copies thereof, whether made under the terms of this Agreement or otherwise. </p>
        <p><strong>6. DISCLAIMER OF WARRANTIES, LIMITATION OF LIABILITY, AND EXCLUSIONS AND LIMITATIONS. 
        THE WEBSITE AND OUR SERVICES ARE PROVIDED BY THE COMPANY ON AN “AS IS” AND ‘‘AS AVAILABLE” BASIS. THE COMPANY MAKES NO REPRESENTATION OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE WEBSITE, OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS, INCLUDED ON THE WEBSITE. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, THE COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE COMPANY DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR 
        THE RESULTS OF THE USE OF THE MATERIALS ON THE WEBSITE IN TERMS OF THEIR CORRECTNESS, ACCURACY, RELIABILITY OR OTHERWISE. 
        UNDER NO CIRCUMSTANCES INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL THE COMPANY OR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING OR DISTRIBUTING THE WEBSITE BE LIABLE FOR ANY LOST PROFITS OR DIRECT, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES (“LOSSES”) THAT RESULT FROM THE USE OF OR INABILITY TO USE THE WEBSITE, INCLUDING BUT NOT LIMITED TO LOSSES ARISING FROM YOUR RELIANCE ON ANY INFORMATION OBTAINED FROM THE WEBSITE OR FROM MISTAKES, OMISSIONS, INTERRUPTIONS, DELETION OF FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES, DELAYS IN OPERATION OR TRANSMISSION, OR ANY FAILURE OF PERFORMANCE, WHETHER OR NOT RESULTING FROM ACTS OF GOD, COMMUNICATIONS FAILURE, THEFT, DESTRUCTION, OR UNAUTHORIZED ACCESS TO THE WEBSITE’S RECORDS, PROGRAMS OR SERVICES. YOU HEREBY ACKNOWLEDGE THAT THIS PARAGRAPH SHALL APPLY TO ALL CONTENT, MERCHANDISE, AND SERVICES AVAILABLE THROUGH THE WEBSITE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. </strong></p>
        <h3>7. Third Party Content.</h3> 
        <p>The Website may provide, or third parties may provide, links to other World Wide Web sites or resources. Because the Company has no control over such sites and resources, you acknowledge and agree that the Company is not responsible for the availability of such external sites or resources, and does not endorse and is not responsible or liable for any content, advertising, products, or other materials on or available from such sites or resources. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such site or resource. You further acknowledge that the Company shall not be held responsible for the accuracy, copyright or trademark compliance, legality, or decency of material contained in sites listed in the Website listings or search results, or that is otherwise provided to the Company by third parties. 
        Your correspondence or business dealings with, or participation in promotions of, advertisers found on or through the Website, including payment and delivery of related goods or services, and any other terms, conditions, warranties or representations associated with such dealings, are solely between you and such advertiser. You agree that the Company shall not be responsible or liable for any loss or damage of any sort incurred as the result of any such dealings or as the result of the presence of such advertisers on the Website. </p>
        <h3>8. Privacy Policy.</h3> 
        <p>In accordance with the terms of the Website’s Privacy Policy, incorporated by reference (available at www.hockeycompass.com/privacy), the Website respects your privacy. </p>
        <h3>9 Successors and Assigns.</h3> 
        <p>This Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective successors and permitted assigns. </p>
        <h3>10. Construction and Interpretation.</h3> 
          <p>Headings in this Agreement are for ease of reference only and are not to be used to interpret the terms and conditions hereof. </p>
        <h3>11. Governing Law.</h3> 
          <p>This Agreement shall be governed by, and construed in accordance with, the laws of Minnesota, without regard to its choice of laws principles. </p>
        <h3>12. Jurisdiction and Venue.</h3> 
          <p>Each party hereby consents to the jurisdiction of the state and federal courts sitting in Minnesota; provided, however, that any decision by any such court may be appealed to the appropriate appellate court or courts. Each party hereby waives any objection it might otherwise have to venue in any of such courts. </p>
        <h3>13. Entire Agreement. </h3>
        <p>This Agreement is intended by the parties as a final expression of their understanding and as a complete and exclusive statement of its terms and supersedes any prior or contemporaneous agreements between them, whether written or oral, with respect to the subject matter hereof. In case any one or more of the provisions contained in this Agreement shall be held to be invalid, illegal or unenforceable, the remaining provisions shall continue to be valid and binding to the extent that they continue to effectuate the intent of the parties as of the date of this Agreement, or of any subsequent modification or amendment of this Agreement. Acceptance of, or acquiescence in, a course of performance rendered under this Agreement shall not operate as a modification of this Agreement or a waiver of any provision of this Agreement. This Agreement may be modified only by an instrument signed by both parties. </p>
        <h3>14. The Company’s Proprietary Rights.</h3> 
          <p>You acknowledge and agree that the Website and any necessary software used in connection with the Website (the “Software”) contain proprietary and confidential information that is protected by applicable intellectual property and other laws. You further acknowledge and agree that content contained in sponsor advertisements or information presented to you through the Website or advertisers is protected by copyrights, trademarks, service marks, patents or other proprietary rights and laws. Except as expressly authorized by the Company or advertisers, you agree not to modify, rent, lease, loan, sell, distribute or create derivative works based on the Website or the Software, in whole or in part. The Company grants you a personal, non-transferable and non-exclusive right and license to use the object code of its Software to use the Website through a Web browser on a single computer; provided that you do not (and do not allow any third party to) copy, modify, create a derivative work of, reverse engineer, reverse assemble or otherwise attempt to discover any source code, sell, assign, 
        sublicense, grant a security interest in or otherwise transfer any right in the Software. You agree not to modify the Software in any manner or form, or to use modified versions of the Software, including (without limitation) for the purpose of obtaining unauthorized access to the Website. You agree not to access the Website by any means other than through the interface that is provided by the Company for use in accessing the Website. 
        Your affirmative act of using this Site and/or registering for the Site or the Services constitutes your electronic signature to these Terms of Use and your consent to enter into agreements with us electronically. </p>
      <h3>15. Copyright Policy.</h3> 
        <p>Company has adopted the following general policy toward copyright infringement in accordance with the Digital Millennium Copyright Act or DMCA (posted at http://www.lcweb.loc.gov/copyright/legislation/dmca.pdf). The address of Company's Designated Agent to Receive Notification of Claimed Infringement ("Designated Agent") is provided at the bottom of this section. </p>
        <h3>Hockeycompass, LLC Copyright Policy. </h3>
        <p>It is Company's policy to (a) block access to or remove material that it believes in good faith to be copyrighted material that has been illegally copied and distributed by any of our advertisers, affiliates, content providers, members or users; and (b) remove and discontinue service to repeat offenders. </p>
        <h3>Procedure for Reporting Copyright Infringements. </h3>
        <p>
          If you believe that material or content residing on or accessible through the Site or the Services infringes a copyright, please send a notice of copyright infringement containing the following information to the Designated Agent listed below ("Proper Bona Fide Infringement Notification"): 
          1. A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright that has been allegedly infringed; 
          2. Identification of works or materials being infringed; 3. Identification of the material that is claimed to be infringing including information regarding the location of the infringing materials that the copyright owner seeks to have removed, with sufficient detail so that Company is capable of finding and verifying its existence; 
          4. Contact information about the notifier including address, telephone number and, if available, email address; 
          5. A statement that the notifier has a good faith belief that the material is not authorized by the copyright owner, its agent, or the law; and 
          6. A statement made under penalty of perjury that the information provided is accurate and the notifying party is authorized to make the complaint on behalf of the copyright owner. 
        </p>
        <h3>Upon Receipt of a Bona Fide Infringement Notification.</h3> 
          <p>Once Proper Bona Fide Infringement Notification is received by the Designated Agent, it is Company’s policy: 
          1. to remove or disable access to the infringing material; 
          2. to notify the content provider, member or user that it has removed or disabled access to the material; and 
          3. that for repeat offenders, Company will also terminate such content provider's, member's or user's access to the service. 
        </p>
        <h3>Procedure to Supply a Counter-Notice to the Designated Agent. </h3>
        <p>If the content provider, member or user believes that the material that was removed or to which access was disabled is either not infringing, or the content provider, member or user believes that it has the right to post and use such material from the copyright owner, the copyright owner's agent, or pursuant to the law, the content provider, member or user must send a counter-notice containing the following information to the Designated Agent listed below: 
        1. A physical or electronic signature of the content provider, member or user; 2. Identification of the material that has been removed or to which access to has been disabled and the location at which the material appeared before it was removed or disabled; 
        3. A statement that the content provider, member or user has a good faith belief that the material was removed or disabled as a result of mistake or a misidentification of the material; and 
        4. The content provider's, member's or user's name, address, telephone number, and, if available, email address and a statement that such person or entity consents to the jurisdiction of the Federal Court for the judicial district in which the content provider's, member's or user's address is located, or if the content provider's, member's or user's address is located outside the United States, for any judicial district in which Company is located, and that such person or entity will accept service of process from the person who provided notification of the alleged infringement. </p>
      <h3>Removal.</h3> 
        <p>If a counter-notice is received by the Designated Agent, Company may send a copy of the counter-notice to the original complaining party informing that person that it may replace the removed material or cease disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed material may be replaced or access to it restored in 10 to 14 business days or more after receipt of the counter-notice, at Company’s discretion. </p>
        <h3>Address for Designated Agent.</h3> 
        <p>Please contact Company’s Designated Agent to Receive Notification of Claimed Infringement at the following address: 
        Copyright Agent, Hockeycompass, LLC 
        11930 50th Ave N 
        Plymouth, MN 55442 Phone: 6127352926 
        Questions regarding the Company’s User Agreement and Terms of Use can be directed to info@hockeycompass.com. </p>

      </div>
    )
  }
} 

export default connect(null, actions)(TermsConditions);