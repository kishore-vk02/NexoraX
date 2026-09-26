import { EmailIncident } from '../types';

// ==========================================
// 1. STARRED EMAILS
// Key high-priority emails flagged by user dharaneeshsk2007@gmail.com
// ==========================================
export const STARRED_EMAILS: EmailIncident[] = [
  {
    id: 'inc-starred-1',
    caseNumber: 'CASE-STARRED-101',
    subject: '⭐ Strategic Partnership: Joint Cyber Defense Operations & SOC Interoperability',
    senderDisplay: 'Dr. Sarah Jenkins (Chief Research Scientist, MIT Lincoln Lab)',
    senderAddress: 's.jenkins@ll.mit.edu',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T11:20:00Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Dear Dharaneesh,

Following up on our symposium presentation regarding autonomous cognitive email threat inspection:

Our team at Lincoln Laboratory has completed our independent validation of your multi-layer RFC protocol parser and on-chain Merkle audit trail. The Bayesian threat score calibration demonstrated a 99.4% true positive rate across 100,000 synthetic BEC scenarios with less than 0.002% false positive interference on legitimate enterprise transaction confirmations.

We would like to formally invite you to present the technical architecture as a Keynote at the upcoming USENIX Security '27 Workshop on Automated Incident Forensics.

Could you confirm your availability for a prep call this Thursday at 3:00 PM EDT?

Warm regards,
Dr. Sarah Jenkins
Lead, Cyber Resilient Autonomous Systems Group
MIT Lincoln Laboratory | Lexington, MA`,
    rawHeaders: `Received: from mail.ll.mit.edu (mail.ll.mit.edu [198.125.179.35])
    by mx.google.com with ESMTPS id mit-991204
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 11:20:00 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=ll.mit.edu;
    spf=pass (sender IP 198.125.179.35 is permitted by ll.mit.edu);
    dmarc=pass (p=reject) header.from=ll.mit.edu
From: "Dr. Sarah Jenkins" <s.jenkins@ll.mit.edu>
To: <dharaneeshsk2007@gmail.com>
Subject: Strategic Partnership: Joint Cyber Defense Operations & SOC Interoperability
Date: Sat, 19 Sep 2026 11:19:50 +0000
Message-ID: <mit-lincoln-collab-20260919@ll.mit.edu>`,
    sha512: '7a1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928a1',
    sha256: '9a19283019283019283019283019283019283019283019283019283019283019',
    sha1: 'aa18273918273918273918273918273918273918',
    md5: 'ba182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'll.mit.edu',
        clientIp: '198.125.179.35',
        record: 'v=spf1 include:_spf.ll.mit.edu ~all',
        aligned: true,
        explanation: 'SPF authenticated from MIT Lincoln Laboratory gateway.'
      },
      dkim: {
        status: 'pass',
        domain: 'll.mit.edu',
        selector: 'll2025',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Valid RSA-2048 cryptographic signature.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy verified.'
      },
      returnPathMatch: true,
      returnPath: 's.jenkins@ll.mit.edu',
      fromHeader: 's.jenkins@ll.mit.edu',
      replyToHeader: 's.jenkins@ll.mit.edu',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<mit-lincoln-collab-20260919@ll.mit.edu>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail.ll.mit.edu',
        fromIP: '198.125.179.35',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T11:20:00Z',
        delayMs: 130,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '198.125.179.35',
          country: 'United States',
          countryCode: 'US',
          city: 'Lexington',
          region: 'Massachusetts',
          lat: 42.4473,
          lng: -71.2272,
          isp: 'MIT Lincoln Laboratory',
          asn: 'AS3 MIT-LL',
          org: 'Massachusetts Institute of Technology',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: false,
          threatScore: 0
        }
      }
    ],
    originatingGeo: {
      ip: '198.125.179.35',
      country: 'United States',
      countryCode: 'US',
      city: 'Lexington',
      region: 'Massachusetts',
      lat: 42.4473,
      lng: -71.2272,
      isp: 'MIT Lincoln Laboratory',
      asn: 'AS3 MIT-LL',
      org: 'Massachusetts Institute of Technology',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: false,
      threatScore: 0
    },
    domainIntel: {
      domain: 'll.mit.edu',
      registrar: 'EDUCAUSE',
      creationDate: '1985-05-23T00:00:00Z',
      ageDays: 15094,
      expiryDate: '2028-07-31T00:00:00Z',
      nameServers: ['bitsy.mit.edu', 'strawb.mit.edu'],
      mxRecords: ['10 mail.ll.mit.edu'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [
      {
        filename: 'USENIX_Security27_Symposium_Charter.pdf',
        filesize: '380 KB',
        filetype: 'application/pdf',
        sha256: 'e1f2a3b4c5d6e7f8901234567890abcdef1234567890abcdef1234567890abcdef',
        isMacroEnabled: false,
        isDoubleExtension: false,
        verdict: 'safe'
      }
    ],
    nlpAnalysis: {
      urgencyScore: 1,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Official academic symposium invitation', 'Peer-reviewed research endorsement']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'MIT Lincoln Laboratory Research Group',
      campaignCluster: 'ACADEMIC-COLLABORATION',
      reasoning: 'Authentic cryptographic signatures from MIT Lincoln Laboratory.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Lexington, MA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-star-1',
        timestamp: '2026-09-19T11:20:00Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '9a19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-starred-2',
    caseNumber: 'CASE-STARRED-102',
    subject: '⭐ GitHub: Security Advisory CVE-2026-9041 fixed in v3.2.0 release',
    senderDisplay: 'GitHub Security Operations',
    senderAddress: 'notifications@github.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T17:40:15Z',
    threatSeverity: 'benign',
    fraudScore: 2,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hello Dharaneesh,

Good news! Dependabot and the automated security team have validated that the upstream advisory CVE-2026-9041 (Buffer Boundary Check in OpenSSL) has been resolved in your repository:
acme-cyber-defense/cognitive-threat-hunter

Status Details:
- Repository: acme-cyber-defense/cognitive-threat-hunter
- Trigger: Pull Request #149 merged by @dharaneeshsk2007
- Security Audit: 0 high-severity dependencies remaining
- Signed Release: v3.2.0 tagged with Sigstore cosign key
- Commit Hash: 8f9b1c28d4e9a2

All continuous integration pipelines, automated SAST scans, and Docker container builds passed with 100% test coverage.

View full release artifacts and cryptographic SHA256 checksums:
https://github.com/acme-cyber-defense/cognitive-threat-hunter/releases/tag/v3.2.0

Best regards,
The GitHub Security Team`,
    rawHeaders: `Received: from smtp.github.com (smtp.github.com [140.82.112.22])
    by mx.google.com with ESMTPS id gh-891023
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 17:40:15 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=github.com;
    spf=pass (sender IP 140.82.112.22 is permitted by github.com);
    dmarc=pass (p=reject) header.from=github.com
From: "GitHub Security Operations" <notifications@github.com>
To: <dharaneeshsk2007@gmail.com>
Subject: GitHub: Security Advisory CVE-2026-9041 fixed in v3.2.0 release
Date: Sat, 19 Sep 2026 17:40:05 +0000
Message-ID: <github-security-advisory-20260919@github.com>`,
    sha512: '8a1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928a2',
    sha256: 'aa19283019283019283019283019283019283019283019283019283019283019',
    sha1: 'ba18273918273918273918273918273918273918',
    md5: 'ca182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'github.com',
        clientIp: '140.82.112.22',
        record: 'v=spf1 include:_spf.github.com ~all',
        aligned: true,
        explanation: 'SPF authenticated from GitHub primary mail cluster.'
      },
      dkim: {
        status: 'pass',
        domain: 'github.com',
        selector: 'pf2023',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Valid DKIM signature verified against GitHub DNS.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'noreply@github.com',
      fromHeader: 'notifications@github.com',
      replyToHeader: 'notifications@github.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<github-security-advisory-20260919@github.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'smtp.github.com',
        fromIP: '140.82.112.22',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T17:40:15Z',
        delayMs: 140,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '140.82.112.22',
          country: 'United States',
          countryCode: 'US',
          city: 'San Francisco',
          region: 'California',
          lat: 37.7749,
          lng: -122.4194,
          isp: 'GitHub, Inc.',
          asn: 'AS36459 GITHUB',
          org: 'GitHub Production Infrastructure',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 0
        }
      }
    ],
    originatingGeo: {
      ip: '140.82.112.22',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'GitHub, Inc.',
      asn: 'AS36459 GITHUB',
      org: 'GitHub Production Infrastructure',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 0
    },
    domainIntel: {
      domain: 'github.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '2007-10-09T18:00:00Z',
      ageDays: 6920,
      expiryDate: '2028-10-09T18:00:00Z',
      nameServers: ['dns1.p08.nsone.net', 'dns2.p08.nsone.net'],
      mxRecords: ['10 smtp.github.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 1,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Official code repository security advisory', 'Cryptographically verified release attestation']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'GitHub Automated Security Operations',
      campaignCluster: 'GITHUB-NOTIFICATIONS',
      reasoning: 'Authentic cryptographic signatures from GitHub, Inc.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-star-2',
        timestamp: '2026-09-19T17:40:15Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: 'aa19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-starred-3',
    caseNumber: 'CASE-STARRED-103',
    subject: '⭐ CISO Directive: Authorization for Automated SOAR Smart-Contract Execution',
    senderDisplay: 'Marcus Vance (Chief Information Security Officer)',
    senderAddress: 'm.vance@acme-global.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T21:05:30Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Dharaneesh,

I have reviewed the performance logs of the Consortium Proof-of-Authority (PoA) smart contracts during the recent BEC wire fraud spike. The automated consensus triggers operated flawlessly, achieving sub-second boundary quarantine before our SWIFT settlement gateways could release funds.

Pursuant to Section 4 of the Enterprise Cyber Incident Response Charter:
1. You are officially authorized to elevate the SOAR smart contract automated policy to Level 3 (Autonomous IP Null-Route + Bank Webhook Suspension).
2. All 5 consortium validator nodes (JP Morgan Chase, BNY Mellon, CISA AIS, Deutsche Bank, Barclays) have ratified the v2.4 upgrade contract.
3. Keep the evidence hash chain anchored to the immutable block ledger for SOC 2 Type II audit trail validation.

Outstanding leadership on this deployment. Let us sync during our quarterly review on Wednesday.

Marcus Vance
Chief Information Security Officer | Acme Global`,
    rawHeaders: `Received: from mail.acme-global.com (mail.acme-global.com [192.88.99.12])
    by mx.google.com with ESMTPS id acme-918231
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 21:05:30 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=acme-global.com;
    spf=pass (sender IP 192.88.99.12 is permitted by acme-global.com);
    dmarc=pass (p=reject) header.from=acme-global.com
From: "Marcus Vance" <m.vance@acme-global.com>
To: <dharaneeshsk2007@gmail.com>
Subject: CISO Directive: Authorization for Automated SOAR Smart-Contract Execution
Date: Sat, 19 Sep 2026 21:05:20 +0000
Message-ID: <ciso-exec-directive-20260919@acme-global.com>`,
    sha512: '9a1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928a3',
    sha256: 'ba19283019283019283019283019283019283019283019283019283019283019',
    sha1: 'ca18273918273918273918273918273918273918',
    md5: 'da182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'acme-global.com',
        clientIp: '192.88.99.12',
        record: 'v=spf1 include:_spf.acme-global.com ~all',
        aligned: true,
        explanation: 'Internal enterprise mail server authenticated.'
      },
      dkim: {
        status: 'pass',
        domain: 'acme-global.com',
        selector: 'sec2026',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Valid corporate DKIM signature.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'm.vance@acme-global.com',
      fromHeader: 'm.vance@acme-global.com',
      replyToHeader: 'm.vance@acme-global.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<ciso-exec-directive-20260919@acme-global.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail.acme-global.com',
        fromIP: '192.88.99.12',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T21:05:30Z',
        delayMs: 95,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '192.88.99.12',
          country: 'United States',
          countryCode: 'US',
          city: 'New York',
          region: 'New York',
          lat: 40.7128,
          lng: -74.006,
          isp: 'Acme Enterprise Network',
          asn: 'AS39485 ACME-NET',
          org: 'Acme Global Corporation',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: false,
          threatScore: 0
        }
      }
    ],
    originatingGeo: {
      ip: '192.88.99.12',
      country: 'United States',
      countryCode: 'US',
      city: 'New York',
      region: 'New York',
      lat: 40.7128,
      lng: -74.006,
      isp: 'Acme Enterprise Network',
      asn: 'AS39485 ACME-NET',
      org: 'Acme Global Corporation',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: false,
      threatScore: 0
    },
    domainIntel: {
      domain: 'acme-global.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '2004-03-12T00:00:00Z',
      ageDays: 8227,
      expiryDate: '2029-03-12T00:00:00Z',
      nameServers: ['ns1.acme-global.com', 'ns2.acme-global.com'],
      mxRecords: ['10 mail.acme-global.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 4,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['C-Suite executive internal directive', 'Authentic internal cryptographic verification']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Acme Global Information Security Office',
      campaignCluster: 'EXECUTIVE-INTERNAL',
      reasoning: 'Authentic cryptographic signatures from Acme Global CISO.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'New York, NY, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-star-3',
        timestamp: '2026-09-19T21:05:30Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: 'ba19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  }
];

// ==========================================
// 2. SENT EMAILS
// Realistic outbound emails sent by dharaneeshsk2007@gmail.com
// ==========================================
export const SENT_EMAILS: EmailIncident[] = [
  {
    id: 'inc-sent-1',
    caseNumber: 'CASE-OUTBOUND-201',
    subject: 'Re: Forensic Root Cause Analysis & Mitigation: Threat Campaign APT-29 BEC Attack',
    senderDisplay: 'Dharaneesh S. K.',
    senderAddress: 'dharaneeshsk2007@gmail.com',
    recipientAddress: 'e.rostova@acme-global.com',
    receivedAt: '2026-09-19T19:22:10Z',
    threatSeverity: 'benign',
    fraudScore: 0,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hi Elena,

I have concluded our deep forensic investigation into the spoofed wire transfer authorization targeting our corporate settlement desk.

Summary of Findings:
1. Ingress Protocol Breach: The adversary attempted a Punycode typo-squatting attack via corp-settlement[.]com with fake SPF neutral headers.
2. Origin IP Tracing: The packet originated from an anonymized Bulletproof Hosting VPS in St. Petersburg, Russia (AS48282), hopping through an OpenVPN egress tunnel in Frankfurt.
3. Autonomous SOAR Response:
   - Quarantine enforced on-chain in 340 milliseconds.
   - Bank settlement webhook for account #49102-9842 suspended.
   - Threat indicators (IOCs) broadcasted across all 5 consortium PoA validator nodes on Block #143.
4. Cryptographic Evidence: The full raw RFC-822 MIME packet and SHA-256 hash (91f8...392) have been sealed into our tamper-evident Merkle tree.

The evidence package and compliance brief for Federal Law Enforcement are attached.

Best regards,
Dharaneesh S. K.
Lead Autonomous Security Architect | Acme Global`,
    rawHeaders: `From: "Dharaneesh S. K." <dharaneeshsk2007@gmail.com>
To: "Elena Rostova" <e.rostova@acme-global.com>
Subject: Re: Forensic Root Cause Analysis & Mitigation: Threat Campaign APT-29 BEC Attack
Date: Sat, 19 Sep 2026 19:22:10 +0000
Message-ID: <sent-forensic-rca-20260919@gmail.com>
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8`,
    sha512: '1b1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b1',
    sha256: 'cb19283019283019283019283019283019283019283019283019283019283019',
    sha1: 'da18273918273918273918273918273918273918',
    md5: 'ea182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'gmail.com',
        clientIp: '209.85.220.41',
        record: 'v=spf1 include:_spf.google.com ~all',
        aligned: true,
        explanation: 'SPF passed via Google Outbound SMTP.'
      },
      dkim: {
        status: 'pass',
        domain: 'gmail.com',
        selector: '20230601',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Signed by user dharaneeshsk2007@gmail.com.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Outbound message cryptographically verified.'
      },
      returnPathMatch: true,
      returnPath: 'dharaneeshsk2007@gmail.com',
      fromHeader: 'dharaneeshsk2007@gmail.com',
      replyToHeader: 'dharaneeshsk2007@gmail.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<sent-forensic-rca-20260919@gmail.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-sor-f41.google.com',
        fromIP: '209.85.220.41',
        byHost: 'smtp.gmail.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T19:22:10Z',
        delayMs: 80,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '209.85.220.41',
          country: 'United States',
          countryCode: 'US',
          city: 'Mountain View',
          region: 'California',
          lat: 37.422,
          lng: -122.0841,
          isp: 'Google LLC',
          asn: 'AS15169 GOOGLE',
          org: 'Google Mail Relay',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 0
        }
      }
    ],
    originatingGeo: {
      ip: '209.85.220.41',
      country: 'United States',
      countryCode: 'US',
      city: 'Mountain View',
      region: 'California',
      lat: 37.422,
      lng: -122.0841,
      isp: 'Google LLC',
      asn: 'AS15169 GOOGLE',
      org: 'Google Mail Relay',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 0
    },
    domainIntel: {
      domain: 'gmail.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1995-08-13T04:00:00Z',
      ageDays: 11360,
      expiryDate: '2029-08-13T04:00:00Z',
      nameServers: ['ns1.google.com', 'ns2.google.com'],
      mxRecords: ['10 gmail-smtp-in.l.google.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [
      {
        filename: 'Forensic_Report_CASE_BEC_0982_ChainOfCustody.pdf',
        filesize: '1.4 MB',
        filetype: 'application/pdf',
        sha256: 'f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
        isMacroEnabled: false,
        isDoubleExtension: false,
        verdict: 'safe'
      }
    ],
    nlpAnalysis: {
      urgencyScore: 0,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Outbound security incident technical report', 'Authorized internal SOC communication']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 100,
      probableActorOrSyndicate: 'Authenticated User Outbox',
      campaignCluster: 'INTERNAL-SOC-REPORTING',
      reasoning: 'Outbound email sent from authenticated user account.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Authenticated Outbox'
    },
    chainOfCustody: [
      {
        id: 'coc-sent-1',
        timestamp: '2026-09-19T19:22:10Z',
        actor: 'Dharaneesh S. K.',
        action: 'Email Dispatched & Cryptographically Signed',
        details: 'Sent via Google Workspace relay with TLS 1.3 encryption.',
        verificationHash: 'cb19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-sent-2',
    caseNumber: 'CASE-OUTBOUND-202',
    subject: 'Consortium PoA Node Deployment: Peering Guide and Genesis Block Signatures',
    senderDisplay: 'Dharaneesh S. K.',
    senderAddress: 'dharaneeshsk2007@gmail.com',
    recipientAddress: 'consortium-nodes@interbank-defense.org',
    receivedAt: '2026-09-18T14:10:00Z',
    threatSeverity: 'benign',
    fraudScore: 0,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Dear Consortium Infrastructure Leads (JP Morgan, BNY Mellon, Deutsche Bank, Barclays, CISA),

The Smart Contract v2.4 upgrade for our inter-bank threat intelligence consortium is scheduled for deployment on Wednesday, September 23, at 14:00 UTC.

Please review the attached genesis configuration:
- Smart Contract Target: 0x3E11889a718290ccB382109848A1099238A792f4
- Consensus Algorithm: Istanbul Byzantine Fault Tolerant (IBFT 2.0) PoA
- Minimum Signatures Required: 3 of 5 validator nodes
- Peer Discovery Port: 30303 (TLS Encrypted Handshake)

Kindly respond with your node's public key attestation before Tuesday 18:00 UTC so we can pre-populate the validator whitelist.

Best regards,
Dharaneesh S. K.
Consortium Protocol Coordinator`,
    rawHeaders: `From: "Dharaneesh S. K." <dharaneeshsk2007@gmail.com>
To: <consortium-nodes@interbank-defense.org>
Subject: Consortium PoA Node Deployment: Peering Guide and Genesis Block Signatures
Date: Fri, 18 Sep 2026 14:10:00 +0000
Message-ID: <sent-consortium-genesis-20260918@gmail.com>`,
    sha512: '2b1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b2',
    sha256: 'db19283019283019283019283019283019283019283019283019283019283019',
    sha1: 'ea18273918273918273918273918273918273918',
    md5: 'fa182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'gmail.com',
        clientIp: '209.85.220.41',
        record: 'v=spf1 include:_spf.google.com ~all',
        aligned: true,
        explanation: 'SPF passed via Google Outbound SMTP.'
      },
      dkim: {
        status: 'pass',
        domain: 'gmail.com',
        selector: '20230601',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Signed by user dharaneeshsk2007@gmail.com.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Outbound message verified.'
      },
      returnPathMatch: true,
      returnPath: 'dharaneeshsk2007@gmail.com',
      fromHeader: 'dharaneeshsk2007@gmail.com',
      replyToHeader: 'dharaneeshsk2007@gmail.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<sent-consortium-genesis-20260918@gmail.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-sor-f41.google.com',
        fromIP: '209.85.220.41',
        byHost: 'smtp.gmail.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-18T14:10:00Z',
        delayMs: 75,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '209.85.220.41',
          country: 'United States',
          countryCode: 'US',
          city: 'Mountain View',
          region: 'California',
          lat: 37.422,
          lng: -122.0841,
          isp: 'Google LLC',
          asn: 'AS15169 GOOGLE',
          org: 'Google Mail Relay',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 0
        }
      }
    ],
    originatingGeo: {
      ip: '209.85.220.41',
      country: 'United States',
      countryCode: 'US',
      city: 'Mountain View',
      region: 'California',
      lat: 37.422,
      lng: -122.0841,
      isp: 'Google LLC',
      asn: 'AS15169 GOOGLE',
      org: 'Google Mail Relay',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 0
    },
    domainIntel: {
      domain: 'gmail.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1995-08-13T04:00:00Z',
      ageDays: 11360,
      expiryDate: '2029-08-13T04:00:00Z',
      nameServers: ['ns1.google.com', 'ns2.google.com'],
      mxRecords: ['10 gmail-smtp-in.l.google.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [
      {
        filename: 'Consortium_Genesis_Specification_v2.4.json',
        filesize: '45 KB',
        filetype: 'application/json',
        sha256: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
        isMacroEnabled: false,
        isDoubleExtension: false,
        verdict: 'safe'
      }
    ],
    nlpAnalysis: {
      urgencyScore: 0,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Outbound protocol specifications', 'Consortium coordination communication']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 100,
      probableActorOrSyndicate: 'Authenticated User Outbox',
      campaignCluster: 'CONSORTIUM-COORDINATION',
      reasoning: 'Outbound email sent from authenticated user account.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Authenticated Outbox'
    },
    chainOfCustody: [
      {
        id: 'coc-sent-2',
        timestamp: '2026-09-18T14:10:00Z',
        actor: 'Dharaneesh S. K.',
        action: 'Email Dispatched',
        details: 'Sent to all 5 consortium financial node coordinators.',
        verificationHash: 'db19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-sent-3',
    caseNumber: 'CASE-OUTBOUND-203',
    subject: 'Feedback & Request: Vertex AI Gemini Model fine-tuning latency in APAC cluster',
    senderDisplay: 'Dharaneesh S. K.',
    senderAddress: 'dharaneeshsk2007@gmail.com',
    recipientAddress: 'cloud-vertex-support@google.com',
    receivedAt: '2026-09-17T08:35:40Z',
    threatSeverity: 'benign',
    fraudScore: 0,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Dear Google Cloud Vertex AI Team,

We are currently benchmarking our fine-tuned Gemini Flash model for real-time header anomaly classification inside Cloud Run (asia-east1).

Our observations:
- P50 Latency: 180ms (excellent)
- P99 Latency: 840ms during cold container starts
- Batch Inference Throughput: 1,400 headers/sec

We would like to request reserved Provisioned Throughput for our production project (AIS-PRODUCTION-CLUSTER-8209) to ensure sub-250ms deterministic P99 responses during volumetric email floods.

Account ID: AIS-PRODUCTION-CLUSTER-8209
Target Model: gemini-2.5-flash-threat-tuned

Thank you for your assistance.

Dharaneesh S. K.`,
    rawHeaders: `From: "Dharaneesh S. K." <dharaneeshsk2007@gmail.com>
To: <cloud-vertex-support@google.com>
Subject: Feedback & Request: Vertex AI Gemini Model fine-tuning latency in APAC cluster
Date: Thu, 17 Sep 2026 08:35:40 +0000
Message-ID: <sent-gcp-vertex-request-20260917@gmail.com>`,
    sha512: '3b1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b3',
    sha256: 'eb19283019283019283019283019283019283019283019283019283019283019',
    sha1: 'fa18273918273918273918273918273918273918',
    md5: '0b182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'gmail.com',
        clientIp: '209.85.220.41',
        record: 'v=spf1 include:_spf.google.com ~all',
        aligned: true,
        explanation: 'SPF passed.'
      },
      dkim: {
        status: 'pass',
        domain: 'gmail.com',
        selector: '20230601',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Signed.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Passed.'
      },
      returnPathMatch: true,
      returnPath: 'dharaneeshsk2007@gmail.com',
      fromHeader: 'dharaneeshsk2007@gmail.com',
      replyToHeader: 'dharaneeshsk2007@gmail.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<sent-gcp-vertex-request-20260917@gmail.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-sor-f41.google.com',
        fromIP: '209.85.220.41',
        byHost: 'smtp.gmail.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-17T08:35:40Z',
        delayMs: 65,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '209.85.220.41',
          country: 'United States',
          countryCode: 'US',
          city: 'Mountain View',
          region: 'California',
          lat: 37.422,
          lng: -122.0841,
          isp: 'Google LLC',
          asn: 'AS15169 GOOGLE',
          org: 'Google Mail Relay',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 0
        }
      }
    ],
    originatingGeo: {
      ip: '209.85.220.41',
      country: 'United States',
      countryCode: 'US',
      city: 'Mountain View',
      region: 'California',
      lat: 37.422,
      lng: -122.0841,
      isp: 'Google LLC',
      asn: 'AS15169 GOOGLE',
      org: 'Google Mail Relay',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 0
    },
    domainIntel: {
      domain: 'gmail.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1995-08-13T04:00:00Z',
      ageDays: 11360,
      expiryDate: '2029-08-13T04:00:00Z',
      nameServers: ['ns1.google.com', 'ns2.google.com'],
      mxRecords: ['10 gmail-smtp-in.l.google.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 0,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Enterprise cloud quota support request']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 100,
      probableActorOrSyndicate: 'Authenticated User Outbox',
      campaignCluster: 'CLOUD-SUPPORT-REQUESTS',
      reasoning: 'Outbound email sent from authenticated user account.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Authenticated Outbox'
    },
    chainOfCustody: [
      {
        id: 'coc-sent-3',
        timestamp: '2026-09-17T08:35:40Z',
        actor: 'Dharaneesh S. K.',
        action: 'Email Dispatched',
        details: 'Sent to Google Cloud support desk.',
        verificationHash: 'eb19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  }
];

// ==========================================
// 3. DRAFT EMAILS
// Realistic unfinished work in progress by dharaneeshsk2007@gmail.com
// ==========================================
export const DRAFT_EMAILS: EmailIncident[] = [
  {
    id: 'inc-draft-1',
    caseNumber: 'CASE-DRAFT-301',
    subject: '[Draft] Proposed CISA Automated Indicator Sharing (AIS) TAXII 2.1 Feed Integration',
    senderDisplay: 'Draft (dharaneeshsk2007@gmail.com)',
    senderAddress: 'dharaneeshsk2007@gmail.com',
    recipientAddress: 'ais-threat-sharing@cisa.dhs.gov',
    receivedAt: '2026-09-20T07:15:00Z',
    threatSeverity: 'benign',
    fraudScore: 0,
    classification: 'Legitimate',
    status: 'investigating',
    bodyText: `Dear CISA AIS Technical Steering Committee,

I am drafting our formal petition to connect the Acme Cognitive Threat Hunter consortium gateway directly to the CISA Automated Indicator Sharing (AIS) TAXII 2.1 STIX exchange.

Key Technical Capabilities we will contribute to the national cybersecurity mesh:
1. Real-time Sub-second BEC and Punycode Domain Intelligence: Over 14,000 verified threat indicators per day.
2. Cryptographically Notarized Proof-of-Authority Evidence: Each indicator is anchored to an immutable Merkle root with multi-bank validator signatures.
3. Automated MITRE ATT&CK Matrix Cross-Referencing: Automatic attribution to known threat actors (APT29, FIN7, Lazarus Group).

[TODO: Attach public PGP key and mutual TLS client certificate generated by our HSM before submitting]

Respectfully submitted,
Dharaneesh S. K.`,
    rawHeaders: `Draft-Saved: Sun, 20 Sep 2026 07:15:00 +0000
From: "Dharaneesh S. K." <dharaneeshsk2007@gmail.com>
To: <ais-threat-sharing@cisa.dhs.gov>
Subject: [Draft] Proposed CISA Automated Indicator Sharing (AIS) TAXII 2.1 Feed Integration
X-Draft-State: Unsent (Saved in Local Drafts)`,
    sha512: '4b1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b4',
    sha256: 'fb19283019283019283019283019283019283019283019283019283019283019',
    sha1: '0b18273918273918273918273918273918273918',
    md5: '1b182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'none',
        domain: 'gmail.com',
        clientIp: '127.0.0.1',
        record: 'Draft email - not yet relayed',
        aligned: true,
        explanation: 'Local draft draft buffer.'
      },
      dkim: {
        status: 'none',
        domain: 'gmail.com',
        selector: 'draft',
        signatureHeaderValid: false,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Will be cryptographically signed upon dispatch.'
      },
      dmarc: {
        status: 'none',
        policy: 'none',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Draft state.'
      },
      returnPathMatch: true,
      returnPath: 'dharaneeshsk2007@gmail.com',
      fromHeader: 'dharaneeshsk2007@gmail.com',
      replyToHeader: 'dharaneeshsk2007@gmail.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<draft-cisa-ais-20260920@gmail.com>',
      tlsVersion: 'Local Draft State',
      cipherSuite: 'AES-256-GCM',
      forgedSenderSuspected: false
    },
    relayHops: [],
    originatingGeo: {
      ip: '127.0.0.1',
      country: 'Local Workstation',
      countryCode: 'US',
      city: 'Local Drafts',
      region: 'Secure Memory',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'Acme Workstation Secure Enclave',
      asn: 'AS0 LOCAL',
      org: 'Local Client State',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: false,
      threatScore: 0
    },
    domainIntel: {
      domain: 'cisa.dhs.gov',
      registrar: 'Federal Registrar (GSA)',
      creationDate: '2003-01-01T00:00:00Z',
      ageDays: 8663,
      expiryDate: '2030-01-01T00:00:00Z',
      nameServers: ['ns1.cisa.gov', 'ns2.cisa.gov'],
      mxRecords: ['10 mail.cisa.gov'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 0,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Unsent drafted federal cyber collaboration petition']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 100,
      probableActorOrSyndicate: 'Authenticated User Drafts',
      campaignCluster: 'LOCAL-DRAFTS',
      reasoning: 'Draft created by authenticated user in mailbox client.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Local Draft'
    },
    chainOfCustody: [
      {
        id: 'coc-draft-1',
        timestamp: '2026-09-20T07:15:00Z',
        actor: 'Dharaneesh S. K.',
        action: 'Draft Auto-Saved',
        details: 'Draft saved in local mailbox cache.',
        verificationHash: 'fb19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-draft-2',
    caseNumber: 'CASE-DRAFT-302',
    subject: '[Draft] Quarterly Cyber Insurance Audit Attestation - Zero Wire-Fraud Losses Verified',
    senderDisplay: 'Draft (dharaneeshsk2007@gmail.com)',
    senderAddress: 'dharaneeshsk2007@gmail.com',
    recipientAddress: 'underwriting@marsh-mclennan.com',
    receivedAt: '2026-09-20T06:40:00Z',
    threatSeverity: 'benign',
    fraudScore: 0,
    classification: 'Legitimate',
    status: 'investigating',
    bodyText: `Dear Cyber Risk Underwriting Team at Marsh & McLennan,

In connection with our policy renewal for Acme Global Cyber Risk Policy #CR-889124-A:

We hereby submit the certified telemetry and forensic audit report covering Q1-Q3 2026:
- Total Phishing & BEC Probing Events Intercepted: 4,892 incidents
- False Positive Rate: 0.0018%
- Direct Financial Loss: $0.00 USD (Zero unauthorized wire diversion)
- Total Fraud Intercept Volume: $1,840,000.00 USD preserved across 3 critical acquisition settlement vectors.
- Automated SOAR Containment Mean Time to Respond (MTTR): 240 milliseconds

[TODO: Arthur Pendelton CFO needs to counter-sign digital signature before final dispatch]

Dharaneesh S. K.
Lead Security Architect`,
    rawHeaders: `Draft-Saved: Sun, 20 Sep 2026 06:40:00 +0000
From: "Dharaneesh S. K." <dharaneeshsk2007@gmail.com>
To: <underwriting@marsh-mclennan.com>
Subject: [Draft] Quarterly Cyber Insurance Audit Attestation - Zero Wire-Fraud Losses Verified
X-Draft-State: Unsent (Saved in Local Drafts)`,
    sha512: '5b1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b5',
    sha256: '0c19283019283019283019283019283019283019283019283019283019283019',
    sha1: '1b18273918273918273918273918273918273918',
    md5: '2b182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'none',
        domain: 'gmail.com',
        clientIp: '127.0.0.1',
        record: 'Draft email',
        aligned: true,
        explanation: 'Local draft buffer.'
      },
      dkim: {
        status: 'none',
        domain: 'gmail.com',
        selector: 'draft',
        signatureHeaderValid: false,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Pending send.'
      },
      dmarc: {
        status: 'none',
        policy: 'none',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Draft.'
      },
      returnPathMatch: true,
      returnPath: 'dharaneeshsk2007@gmail.com',
      fromHeader: 'dharaneeshsk2007@gmail.com',
      replyToHeader: 'dharaneeshsk2007@gmail.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<draft-insurance-audit-20260920@gmail.com>',
      tlsVersion: 'Local Draft State',
      cipherSuite: 'AES-256-GCM',
      forgedSenderSuspected: false
    },
    relayHops: [],
    originatingGeo: {
      ip: '127.0.0.1',
      country: 'Local Workstation',
      countryCode: 'US',
      city: 'Local Drafts',
      region: 'Secure Memory',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'Acme Workstation Secure Enclave',
      asn: 'AS0 LOCAL',
      org: 'Local Client State',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: false,
      threatScore: 0
    },
    domainIntel: {
      domain: 'marsh-mclennan.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1997-04-10T04:00:00Z',
      ageDays: 10755,
      expiryDate: '2028-04-10T04:00:00Z',
      nameServers: ['ns1.marsh.com', 'ns2.marsh.com'],
      mxRecords: ['10 mail.marsh.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 0,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Cyber insurance compliance draft attestation']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 100,
      probableActorOrSyndicate: 'Authenticated User Drafts',
      campaignCluster: 'LOCAL-DRAFTS',
      reasoning: 'Draft created by user.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Local Draft'
    },
    chainOfCustody: [
      {
        id: 'coc-draft-2',
        timestamp: '2026-09-20T06:40:00Z',
        actor: 'Dharaneesh S. K.',
        action: 'Draft Auto-Saved',
        details: 'Draft saved in local mailbox cache.',
        verificationHash: '0c19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  }
];

// ==========================================
// 4. TRASH & QUARANTINED DISCARDED EMAILS
// Deleted newsletters, spam discards, or decommissioned test cases
// ==========================================
export const TRASH_EMAILS: EmailIncident[] = [
  {
    id: 'inc-trash-1',
    caseNumber: 'CASE-TRASH-401',
    subject: 'Marketing Promo: 50% Off Annual Enterprise Cloud Security Hardware Tokens (Expired)',
    senderDisplay: 'KeyVault Security Promos',
    senderAddress: 'marketing@keyvault-promotions-retail.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-12T10:11:00Z',
    threatSeverity: 'low',
    fraudScore: 28,
    classification: 'Suspicious',
    status: 'resolved',
    bodyText: `Dear Security Enthusiast,

Our semi-annual blowout sale on FIDO2 biometric YubiKey alternatives is ending at midnight! Get 50% off bulk bundles of 25 keys or more.

Click here to claim your enterprise discount code:
https://keyvault-promotions-retail.com/discount/bulk50

(You received this email because you registered at RSA Conference 2025. Unsubscribe here)`,
    rawHeaders: `Received: from mail-promo.keyvault-promotions-retail.com (198.51.100.24)
    by mx.google.com with ESMTPS id trash-promo-8812
    for <dharaneeshsk2007@gmail.com>; Sat, 12 Sep 2026 10:11:00 +0000 (UTC)
From: "KeyVault Security Promos" <marketing@keyvault-promotions-retail.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Marketing Promo: 50% Off Annual Enterprise Cloud Security Hardware Tokens (Expired)
Date: Sat, 12 Sep 2026 10:10:52 +0000`,
    sha512: '6b1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b6',
    sha256: '1c19283019283019283019283019283019283019283019283019283019283019',
    sha1: '2b18273918273918273918273918273918273918',
    md5: '3b182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'softfail',
        domain: 'keyvault-promotions-retail.com',
        clientIp: '198.51.100.24',
        record: 'v=spf1 ~all',
        aligned: false,
        explanation: 'Marketing third-party blast.'
      },
      dkim: {
        status: 'pass',
        domain: 'keyvault-promotions-retail.com',
        selector: 'promo1',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Signed by marketing provider.'
      },
      dmarc: {
        status: 'none',
        policy: 'none',
        alignment: 'unaligned',
        disposition: 'pass',
        explanation: 'Policy not enforced.'
      },
      returnPathMatch: false,
      returnPath: 'bounce@keyvault-promotions-retail.com',
      fromHeader: 'marketing@keyvault-promotions-retail.com',
      replyToHeader: 'no-reply@keyvault-promotions-retail.com',
      replyToMismatch: true,
      messageIdAnomaly: false,
      messageId: '<promo-8812903@keyvault-promotions-retail.com>',
      tlsVersion: 'TLSv1.2',
      cipherSuite: 'ECDHE-RSA-AES128-GCM-SHA256',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-promo.keyvault-promotions-retail.com',
        fromIP: '198.51.100.24',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-12T10:11:00Z',
        delayMs: 280,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '198.51.100.24',
          country: 'United States',
          countryCode: 'US',
          city: 'Dallas',
          region: 'Texas',
          lat: 32.7767,
          lng: -96.797,
          isp: 'Bulk Mail Host',
          asn: 'AS44123 BULK-NET',
          org: 'Marketing Relay LLC',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 20
        }
      }
    ],
    originatingGeo: {
      ip: '198.51.100.24',
      country: 'United States',
      countryCode: 'US',
      city: 'Dallas',
      region: 'Texas',
      lat: 32.7767,
      lng: -96.797,
      isp: 'Bulk Mail Host',
      asn: 'AS44123 BULK-NET',
      org: 'Marketing Relay LLC',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 20
    },
    domainIntel: {
      domain: 'keyvault-promotions-retail.com',
      registrar: 'GoDaddy.com, LLC',
      creationDate: '2024-01-10T12:00:00Z',
      ageDays: 984,
      expiryDate: '2027-01-10T12:00:00Z',
      nameServers: ['ns1.domaincontrol.com', 'ns2.domaincontrol.com'],
      mxRecords: ['10 mail-promo.keyvault-promotions-retail.com'],
      threatReputationScore: 25,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 35,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Commercial solicitation', 'Aggressive marketing discount deadline']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 80,
      probableActorOrSyndicate: 'Bulk Marketing Blast Service',
      campaignCluster: 'MARKETING-BULK',
      reasoning: 'Bulk commercial advertisement moved to Trash by user.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Dallas, TX, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-trash-1',
        timestamp: '2026-09-12T10:11:00Z',
        actor: 'User dharaneeshsk2007@gmail.com',
        action: 'Moved to Trash',
        details: 'User discarded marketing solicitation.',
        verificationHash: '1c19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-trash-2',
    caseNumber: 'CASE-TRASH-402',
    subject: 'Old Verification Code: GitHub one-time password (OTP: 894102)',
    senderDisplay: 'GitHub Authentication',
    senderAddress: 'noreply@github.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-15T03:12:00Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'resolved',
    bodyText: `Your GitHub authentication code is: 894102

This code will expire in 10 minutes. If you did not make this request, you can safely ignore this email.

GitHub, Inc. | 88 Colin P Kelly Jr St, San Francisco, CA 94107`,
    rawHeaders: `Received: from smtp.github.com (140.82.112.22)
    by mx.google.com with ESMTPS id gh-otp-91823
    for <dharaneeshsk2007@gmail.com>; Tue, 15 Sep 2026 03:12:00 +0000 (UTC)
From: "GitHub Authentication" <noreply@github.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Old Verification Code: GitHub one-time password (OTP: 894102)
Date: Tue, 15 Sep 2026 03:11:50 +0000`,
    sha512: '7b1928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b7',
    sha256: '2c19283019283019283019283019283019283019283019283019283019283019',
    sha1: '3b18273918273918273918273918273918273918',
    md5: '4b182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'github.com',
        clientIp: '140.82.112.22',
        record: 'v=spf1 include:_spf.github.com ~all',
        aligned: true,
        explanation: 'SPF verified.'
      },
      dkim: {
        status: 'pass',
        domain: 'github.com',
        selector: 'pf2023',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'DKIM valid.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'DMARC pass.'
      },
      returnPathMatch: true,
      returnPath: 'noreply@github.com',
      fromHeader: 'noreply@github.com',
      replyToHeader: 'noreply@github.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<gh-otp-91823@github.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'smtp.github.com',
        fromIP: '140.82.112.22',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-15T03:12:00Z',
        delayMs: 90,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '140.82.112.22',
          country: 'United States',
          countryCode: 'US',
          city: 'San Francisco',
          region: 'California',
          lat: 37.7749,
          lng: -122.4194,
          isp: 'GitHub, Inc.',
          asn: 'AS36459 GITHUB',
          org: 'GitHub Infrastructure',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 0
        }
      }
    ],
    originatingGeo: {
      ip: '140.82.112.22',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'GitHub, Inc.',
      asn: 'AS36459 GITHUB',
      org: 'GitHub Infrastructure',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 0
    },
    domainIntel: {
      domain: 'github.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '2007-10-09T18:00:00Z',
      ageDays: 6920,
      expiryDate: '2028-10-09T18:00:00Z',
      nameServers: ['dns1.p08.nsone.net'],
      mxRecords: ['10 smtp.github.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 10,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Expired transactional OTP login code', 'User cleaned up inbox by deleting']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'GitHub Authentication Service',
      campaignCluster: 'GITHUB-AUTH',
      reasoning: 'Authentic 2FA OTP code discarded after login.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-trash-2',
        timestamp: '2026-09-15T03:12:00Z',
        actor: 'User dharaneeshsk2007@gmail.com',
        action: 'Moved to Trash',
        details: 'User trashed expired OTP notification.',
        verificationHash: '2c19283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  }
];
