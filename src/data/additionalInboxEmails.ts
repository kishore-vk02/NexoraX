import { EmailIncident } from '../types';

export const ADDITIONAL_INBOX_EMAILS: EmailIncident[] = [
  {
    id: 'inc-inbox-1001',
    caseNumber: 'CASE-BENIGN-1001',
    subject: 'Google Cloud Platform: Monthly Billing Statement for August 2026 Ready',
    senderDisplay: 'Google Cloud Billing',
    senderAddress: 'google-cloud-billing-noreply@google.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-18T16:42:10Z',
    threatSeverity: 'benign',
    fraudScore: 2,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Dear Dharaneesh,

Your Google Cloud Platform billing statement for August 2026 is now available for download.

Billing Account: AIS-PRODUCTION-CLUSTER-8209
Invoice Number: GCP-INV-202608-98124
Total Charges: $84.20 USD
Payment Status: Automatically charged to corporate Visa ending in 8842

Summary of Core Services:
- Cloud Run Services (Asia-East1): $42.50
- Vertex AI Gemini API Inference Units: $29.80
- Cloud Firestore Active Reads/Writes: $11.90

You can view the detailed breakdown, analyze cost anomalies, or export usage reports to BigQuery anytime from the Google Cloud Console.

Google Cloud Billing Team
1600 Amphitheatre Parkway, Mountain View, CA 94043`,
    rawHeaders: `Received: from mail-wm1-f44.google.com (mail-wm1-f44.google.com [209.85.128.44])
    by mx.google.com with ESMTPS id gcp-991283
    for <dharaneeshsk2007@gmail.com>; Fri, 18 Sep 2026 16:42:10 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=google.com;
    spf=pass (sender IP 209.85.128.44 is permitted by _spf.google.com);
    dmarc=pass (p=reject) header.from=google.com
From: "Google Cloud Billing" <google-cloud-billing-noreply@google.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Google Cloud Platform: Monthly Billing Statement for August 2026 Ready
Date: Fri, 18 Sep 2026 16:42:02 +0000
Message-ID: <gcp-billing-202609181642.88192@google.com>`,
    sha512: '18f882910c8127391b827e8a1099238a792f441b8219ad58ef9c7e2b1029c9e88102d1847c0b991823abce849920aa81273019284729182381203912093847120391',
    sha256: '9182301928301928301928301928301928301928301928301928301928301928',
    sha1: '8172635481920394857162534819203948571625',
    md5: '81726354819203948571625348192039',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'google.com',
        clientIp: '209.85.128.44',
        record: 'v=spf1 include:_spf.google.com ~all',
        aligned: true,
        explanation: 'SPF authenticated from Google Cloud corporate outbound relay.'
      },
      dkim: {
        status: 'pass',
        domain: 'google.com',
        selector: '20230601',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Valid RSA-SHA256 signature verified against Google DNS.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy validated with zero anomalies.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@google.com',
      fromHeader: 'google-cloud-billing-noreply@google.com',
      replyToHeader: 'google-cloud-billing-noreply@google.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<gcp-billing-202609181642.88192@google.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-wm1-f44.google.com',
        fromIP: '209.85.128.44',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-18T16:42:10Z',
        delayMs: 140,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '209.85.128.44',
          country: 'United States',
          countryCode: 'US',
          city: 'Mountain View',
          region: 'California',
          lat: 37.422,
          lng: -122.0841,
          isp: 'Google LLC',
          asn: 'AS15169 GOOGLE',
          org: 'Google Infrastructure Services',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '209.85.128.44',
      country: 'United States',
      countryCode: 'US',
      city: 'Mountain View',
      region: 'California',
      lat: 37.422,
      lng: -122.0841,
      isp: 'Google LLC',
      asn: 'AS15169 GOOGLE',
      org: 'Google Infrastructure Services',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'google.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1997-09-15T04:00:00Z',
      ageDays: 10595,
      expiryDate: '2028-09-13T04:00:00Z',
      nameServers: ['ns1.google.com', 'ns2.google.com'],
      mxRecords: ['10 smtp.google.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [
      {
        filename: 'Invoice_GCP_August2026.pdf',
        filesize: '142 KB',
        filetype: 'application/pdf',
        sha256: 'a1b2c3d4e5f678901234567890abcdef1234567890abcdef1234567890abcdef',
        isMacroEnabled: false,
        isDoubleExtension: false,
        verdict: 'safe'
      }
    ],
    nlpAnalysis: {
      urgencyScore: 4,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Official GCP Billing statement', 'Passed all cryptographic authentications']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Google Billing Automation Service',
      campaignCluster: 'GCP-BILLING',
      reasoning: 'Authentic cryptographic signatures from Google LLC.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Mountain View, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1001',
        timestamp: '2026-09-18T16:42:10Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '9182301928301928301928301928301928301928301928301928301928301928'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1002',
    caseNumber: 'CASE-BENIGN-1002',
    subject: 'Linear: 3 issues resolved in Sprint 34 (Threat Intel & MITRE Visualizer)',
    senderDisplay: 'Linear Updates',
    senderAddress: 'notifications@linear.app',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T09:15:22Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hey Dharaneesh,

Sprint 34 update for Workspace Cyber Defense Engine:

Completed Issues:
✓ LIN-482: Implement Merkle tree verification visualization for Consortium PoA Blockchain
✓ LIN-489: Add real-time Bayesian risk scoring slider in Model Training Studio
✓ LIN-501: Upgrade cryptographic parser to extract TLS 1.3 cipher handshakes

Upcoming in Sprint 35:
- LIN-512: Auto-sync threat indicators with CISA Automated Indicator Sharing (AIS)
- LIN-518: Add export to STIX/TAXII 2.1 feed format

Check out the full sprint board on Linear:
https://linear.app/evi-mail/sprint-34

Happy coding,
The Linear Team`,
    rawHeaders: `Received: from mail-relay.linear.app (mail-relay.linear.app [76.223.41.109])
    by mx.google.com with ESMTPS id lin-918230
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 09:15:22 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=linear.app;
    spf=pass (sender IP 76.223.41.109 is permitted by linear.app);
    dmarc=pass (p=reject) header.from=linear.app
From: "Linear Updates" <notifications@linear.app>
To: <dharaneeshsk2007@gmail.com>
Subject: Linear: 3 issues resolved in Sprint 34 (Threat Intel & MITRE Visualizer)
Date: Sat, 19 Sep 2026 09:15:15 +0000
Message-ID: <linear-issue-update-20260919@linear.app>`,
    sha512: '38a19283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283',
    sha256: '4918230192830192830192830192830192830192830192830192830192830192',
    sha1: '3918273918273918273918273918273918273918',
    md5: '29182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'linear.app',
        clientIp: '76.223.41.109',
        record: 'v=spf1 include:_spf.linear.app ~all',
        aligned: true,
        explanation: 'SPF verified from official Linear app cluster.'
      },
      dkim: {
        status: 'pass',
        domain: 'linear.app',
        selector: 's1',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'DKIM signature valid and cryptographic verification successful.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'DMARC alignment verified.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@linear.app',
      fromHeader: 'notifications@linear.app',
      replyToHeader: 'notifications@linear.app',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<linear-issue-update-20260919@linear.app>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-relay.linear.app',
        fromIP: '76.223.41.109',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T09:15:22Z',
        delayMs: 180,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '76.223.41.109',
          country: 'United States',
          countryCode: 'US',
          city: 'San Francisco',
          region: 'California',
          lat: 37.7749,
          lng: -122.4194,
          isp: 'Amazon.com, Inc.',
          asn: 'AS16509 AMAZON-02',
          org: 'Linear Infrastructure Service',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '76.223.41.109',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'Amazon.com, Inc.',
      asn: 'AS16509 AMAZON-02',
      org: 'Linear Infrastructure Service',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'linear.app',
      registrar: 'NameCheap, Inc.',
      creationDate: '2019-02-14T12:00:00Z',
      ageDays: 2775,
      expiryDate: '2028-02-14T12:00:00Z',
      nameServers: ['ns1.linear.app', 'ns2.linear.app'],
      mxRecords: ['10 mail.linear.app'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 2,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Project management workflow notification', 'Genuine authenticated issue tracker']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Linear Issue Tracking Service',
      campaignCluster: 'LINEAR-APP-NOTIFICATIONS',
      reasoning: 'Authentic cryptographic signatures from Linear.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1002',
        timestamp: '2026-09-19T09:15:22Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '4918230192830192830192830192830192830192830192830192830192830192'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1003',
    caseNumber: 'CASE-BENIGN-1003',
    subject: 'Stripe: Payout of $6,840.50 USD is on the way to your bank account',
    senderDisplay: 'Stripe Support',
    senderAddress: 'support@stripe.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T14:30:45Z',
    threatSeverity: 'benign',
    fraudScore: 3,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hello Dharaneesh,

A scheduled payout of $6,840.50 USD is now en route to your Silicon Valley Bank business checking account ending in •••• 9214.

Payout Breakdown:
- Gross Charges: $7,080.00 USD (32 customer transactions)
- Stripe Processing Fees: -$239.50 USD
- Net Deposit: $6,840.50 USD
- Estimated Arrival: Monday, September 21, 2026

You can track payout transit, export QuickBooks ledger reconciliations, or view customer disputes directly from your Stripe Dashboard:
https://dashboard.stripe.com/payouts/po_1Ox892182903

Thanks for building on Stripe,
The Stripe Payments Team`,
    rawHeaders: `Received: from mail-stripetx.stripe.com (mail-stripetx.stripe.com [54.187.174.169])
    by mx.google.com with ESMTPS id stripe-892182
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 14:30:45 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=stripe.com;
    spf=pass (sender IP 54.187.174.169 is permitted by stripe.com);
    dmarc=pass (p=reject) header.from=stripe.com
From: "Stripe Support" <support@stripe.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Stripe: Payout of $6,840.50 USD is on the way to your bank account
Date: Sat, 19 Sep 2026 14:30:38 +0000
Message-ID: <payout-po_1Ox892182903@stripe.com>`,
    sha512: '4819283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019284',
    sha256: '5819283019283019283019283019283019283019283019283019283019283019',
    sha1: '4918273918273918273918273918273918273918',
    md5: '39182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'stripe.com',
        clientIp: '54.187.174.169',
        record: 'v=spf1 include:_spf.stripe.com ~all',
        aligned: true,
        explanation: 'SPF verified from official Stripe transactional cluster.'
      },
      dkim: {
        status: 'pass',
        domain: 'stripe.com',
        selector: 's2022',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Cryptographic DKIM signature matches Stripe DNS public key.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@stripe.com',
      fromHeader: 'support@stripe.com',
      replyToHeader: 'support@stripe.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<payout-po_1Ox892182903@stripe.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-stripetx.stripe.com',
        fromIP: '54.187.174.169',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T14:30:45Z',
        delayMs: 160,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '54.187.174.169',
          country: 'United States',
          countryCode: 'US',
          city: 'Seattle',
          region: 'Washington',
          lat: 47.6062,
          lng: -122.3321,
          isp: 'Amazon.com, Inc.',
          asn: 'AS16509 AMAZON-02',
          org: 'Stripe Payments Production Network',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '54.187.174.169',
      country: 'United States',
      countryCode: 'US',
      city: 'Seattle',
      region: 'Washington',
      lat: 47.6062,
      lng: -122.3321,
      isp: 'Amazon.com, Inc.',
      asn: 'AS16509 AMAZON-02',
      org: 'Stripe Payments Production Network',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'stripe.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1995-03-24T05:00:00Z',
      ageDays: 11502,
      expiryDate: '2029-03-25T05:00:00Z',
      nameServers: ['dns1.p01.nsone.net', 'dns2.p01.nsone.net'],
      mxRecords: ['10 mxa.stripe.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 3,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Authentic fintech settlement notification', 'Cryptographically verified Stripe transaction']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Stripe Automated Payout Engine',
      campaignCluster: 'STRIPE-PAYOUTS',
      reasoning: 'Authentic cryptographic signatures from Stripe, Inc.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'South San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1003',
        timestamp: '2026-09-19T14:30:45Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '5819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1004',
    caseNumber: 'CASE-BENIGN-1004',
    subject: 'Cloudflare: DDoS mitigation prevented 42,000 requests to api.acme-defense.io',
    senderDisplay: 'Cloudflare Alerts',
    senderAddress: 'no-reply@cloudflare.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T18:12:05Z',
    threatSeverity: 'benign',
    fraudScore: 2,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hello Security Operations,

Cloudflare automated autonomous edge protection successfully mitigated an L7 volumetric HTTPS flood attack targeting your endpoint api.acme-defense.io.

Attack Incident Summary:
- Time of Spike: 17:58 UTC - 18:04 UTC (6 minutes duration)
- Peak Request Rate: 42,000 req/sec
- Attack Vector: HTTP/2 Rapid Reset Flood (CVE-2023-44487 variant)
- Origin Cluster: Distributed Mirai botnet IoT nodes across APAC
- Edge Mitigation Action: Managed Challenge & Drop at Edge (100% of attack traffic blocked)
- Customer Traffic Impact: Zero latency degradation; 0% 5xx errors served

Your edge rules and firewall policies continue to safeguard all active ingress domains.

View the attack analytics and ASN distributions in your Cloudflare Security Center:
https://dash.cloudflare.com/analytics/security

Cloudflare Automated Threat Defense Team`,
    rawHeaders: `Received: from mail.cloudflare.com (mail.cloudflare.com [198.41.130.40])
    by mx.google.com with ESMTPS id cf-819203
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 18:12:05 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=cloudflare.com;
    spf=pass (sender IP 198.41.130.40 is permitted by cloudflare.com);
    dmarc=pass (p=reject) header.from=cloudflare.com
From: "Cloudflare Alerts" <no-reply@cloudflare.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Cloudflare: DDoS mitigation prevented 42,000 requests to api.acme-defense.io
Date: Sat, 19 Sep 2026 18:11:58 +0000
Message-ID: <cloudflare-security-alert-20260919@cloudflare.com>`,
    sha512: '5819283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019285',
    sha256: '6819283019283019283019283019283019283019283019283019283019283019',
    sha1: '5918273918273918273918273918273918273918',
    md5: '49182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'cloudflare.com',
        clientIp: '198.41.130.40',
        record: 'v=spf1 include:_spf.cloudflare.com ~all',
        aligned: true,
        explanation: 'SPF verified from Cloudflare edge mail infrastructure.'
      },
      dkim: {
        status: 'pass',
        domain: 'cloudflare.com',
        selector: 'cf2024',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Cryptographic DKIM signature matches Cloudflare DNS public key.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@cloudflare.com',
      fromHeader: 'no-reply@cloudflare.com',
      replyToHeader: 'no-reply@cloudflare.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<cloudflare-security-alert-20260919@cloudflare.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail.cloudflare.com',
        fromIP: '198.41.130.40',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T18:12:05Z',
        delayMs: 110,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '198.41.130.40',
          country: 'United States',
          countryCode: 'US',
          city: 'San Francisco',
          region: 'California',
          lat: 37.7749,
          lng: -122.4194,
          isp: 'Cloudflare, Inc.',
          asn: 'AS13335 CLOUDFLARENET',
          org: 'Cloudflare Global Edge Anycast',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '198.41.130.40',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'Cloudflare, Inc.',
      asn: 'AS13335 CLOUDFLARENET',
      org: 'Cloudflare Global Edge Anycast',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'cloudflare.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '2009-02-17T03:00:00Z',
      ageDays: 6424,
      expiryDate: '2029-02-17T03:00:00Z',
      nameServers: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
      mxRecords: ['10 mail.cloudflare.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 12,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Official security report', 'Legitimate edge DDoS defense advisory']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Cloudflare Autonomous Security Platform',
      campaignCluster: 'CLOUDFLARE-ALERTS',
      reasoning: 'Authentic cryptographic signatures from Cloudflare, Inc.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1004',
        timestamp: '2026-09-19T18:12:05Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '6819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1005',
    caseNumber: 'CASE-BENIGN-1005',
    subject: 'Slack: Elena Rostova invited you to #incident-response-war-room',
    senderDisplay: 'Slack Notifications',
    senderAddress: 'notification@slack.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T20:45:18Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hi Dharaneesh,

Elena Rostova (Lead Incident Commander) has invited you to join the channel:
#incident-response-war-room in Acme Global Cyber Security.

Topic: "Live triage, SOAR smart-contract trigger coordination, and MITRE adversary mapping sync."

Channel Details:
- Members: 14 engineers & analysts
- Connected Integrations: PagerDuty, Evi-Mail Threat Hunter Gateway, GitHub Actions, AWS Security Hub

Click below to open Slack and join the discussion:
https://slack.com/app_redirect?channel=C0789218290

Cheers,
The Slack Team`,
    rawHeaders: `Received: from mail.slack.com (mail.slack.com [54.240.27.12])
    by mx.google.com with ESMTPS id slack-982172
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 20:45:18 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=slack.com;
    spf=pass (sender IP 54.240.27.12 is permitted by slack.com);
    dmarc=pass (p=reject) header.from=slack.com
From: "Slack Notifications" <notification@slack.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Slack: Elena Rostova invited you to #incident-response-war-room
Date: Sat, 19 Sep 2026 20:45:10 +0000
Message-ID: <slack-invite-20260919@slack.com>`,
    sha512: '6819283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019286',
    sha256: '7819283019283019283019283019283019283019283019283019283019283019',
    sha1: '6918273918273918273918273918273918273918',
    md5: '59182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'slack.com',
        clientIp: '54.240.27.12',
        record: 'v=spf1 include:_spf.slack.com ~all',
        aligned: true,
        explanation: 'SPF verified from Slack relay network.'
      },
      dkim: {
        status: 'pass',
        domain: 'slack.com',
        selector: 'slack2023',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Valid cryptographic DKIM signature.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@slack.com',
      fromHeader: 'notification@slack.com',
      replyToHeader: 'notification@slack.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<slack-invite-20260919@slack.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail.slack.com',
        fromIP: '54.240.27.12',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T20:45:18Z',
        delayMs: 130,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '54.240.27.12',
          country: 'United States',
          countryCode: 'US',
          city: 'San Francisco',
          region: 'California',
          lat: 37.7749,
          lng: -122.4194,
          isp: 'Amazon.com, Inc.',
          asn: 'AS16509 AMAZON-02',
          org: 'Slack Enterprise Messaging',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '54.240.27.12',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'Amazon.com, Inc.',
      asn: 'AS16509 AMAZON-02',
      org: 'Slack Enterprise Messaging',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'slack.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1998-05-18T04:00:00Z',
      ageDays: 10351,
      expiryDate: '2029-05-18T04:00:00Z',
      nameServers: ['ns1.slack.com', 'ns2.slack.com'],
      mxRecords: ['10 mail.slack.com'],
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
      detectedCues: ['Team collaboration invite', 'Authentic verified channel invitation']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Slack Workspace Messaging Service',
      campaignCluster: 'SLACK-NOTIFICATIONS',
      reasoning: 'Authentic cryptographic signatures from Slack Technologies LLC.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1005',
        timestamp: '2026-09-19T20:45:18Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '7819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1006',
    caseNumber: 'CASE-BENIGN-1006',
    subject: 'OpenAI: API usage tier upgrade approved (Tier 5 Enterprise Rate Limits)',
    senderDisplay: 'OpenAI Platform Team',
    senderAddress: 'support@openai.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-19T22:18:40Z',
    threatSeverity: 'benign',
    fraudScore: 2,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hello Dharaneesh,

Your organization request to increase rate limits for your threat hunting inference pipelines has been reviewed and approved.

Organization: Acme Cyber Defense Corp (org-9812903)
Updated Tier: Tier 5 Enterprise
New Throughput Quota:
- GPT-4o / Reasoning Models: 10,000,000 Tokens Per Minute (TPM)
- Request Ceiling: 10,000 Requests Per Minute (RPM)
- Concurrent Batch Inference: 50,000 requests

Your existing API keys now reflect these limits immediately with zero downtime.

View your latency percentiles and token burn charts in your Developer Dashboard:
https://platform.openai.com/usage

Best regards,
The OpenAI Platform Team`,
    rawHeaders: `Received: from mail.openai.com (mail.openai.com [198.2.138.89])
    by mx.google.com with ESMTPS id oai-891283
    for <dharaneeshsk2007@gmail.com>; Sat, 19 Sep 2026 22:18:40 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=openai.com;
    spf=pass (sender IP 198.2.138.89 is permitted by openai.com);
    dmarc=pass (p=reject) header.from=openai.com
From: "OpenAI Platform Team" <support@openai.com>
To: <dharaneeshsk2007@gmail.com>
Subject: OpenAI: API usage tier upgrade approved (Tier 5 Enterprise Rate Limits)
Date: Sat, 19 Sep 2026 22:18:32 +0000
Message-ID: <openai-tier-upgrade-20260919@openai.com>`,
    sha512: '7819283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019287',
    sha256: '8819283019283019283019283019283019283019283019283019283019283019',
    sha1: '7918273918273918273918273918273918273918',
    md5: '69182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'openai.com',
        clientIp: '198.2.138.89',
        record: 'v=spf1 include:_spf.openai.com ~all',
        aligned: true,
        explanation: 'SPF verified from OpenAI platform cluster.'
      },
      dkim: {
        status: 'pass',
        domain: 'openai.com',
        selector: 'k1',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Cryptographic DKIM signature matches OpenAI public key.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@openai.com',
      fromHeader: 'support@openai.com',
      replyToHeader: 'support@openai.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<openai-tier-upgrade-20260919@openai.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail.openai.com',
        fromIP: '198.2.138.89',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-19T22:18:40Z',
        delayMs: 140,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '198.2.138.89',
          country: 'United States',
          countryCode: 'US',
          city: 'San Francisco',
          region: 'California',
          lat: 37.7749,
          lng: -122.4194,
          isp: 'SendGrid, Inc.',
          asn: 'AS11377 PAIR-NETWORKS',
          org: 'OpenAI Developer Operations',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '198.2.138.89',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'SendGrid, Inc.',
      asn: 'AS11377 PAIR-NETWORKS',
      org: 'OpenAI Developer Operations',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'openai.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '2015-12-11T20:00:00Z',
      ageDays: 3935,
      expiryDate: '2028-12-11T20:00:00Z',
      nameServers: ['ns1.openai.com', 'ns2.openai.com'],
      mxRecords: ['10 mail.openai.com'],
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
      detectedCues: ['Developer service configuration announcement', 'Authentic OpenAI developer communication']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'OpenAI Developer Platform',
      campaignCluster: 'OPENAI-NOTIFICATIONS',
      reasoning: 'Authentic cryptographic signatures from OpenAI, L.L.C.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1006',
        timestamp: '2026-09-19T22:18:40Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '8819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1007',
    caseNumber: 'CASE-BENIGN-1007',
    subject: 'Atlassian Jira: [SEC-1092] Zero-Day vulnerability mitigation deployed to production cluster',
    senderDisplay: 'Jira Software Cloud',
    senderAddress: 'jira@acme-global.atlassian.net',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-20T02:10:15Z',
    threatSeverity: 'benign',
    fraudScore: 2,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Security Task SEC-1092 has been marked as DONE by Maya Lin (Lead DevSecOps).

Issue Title: Patch Postfix and OpenSSL libraries against CVE-2026-8812
Status: Closed / Verified in Production
Resolution: Hotfix Deployed
Fix Version: v2.4.1-hotfix.3

Sprint Review Note:
"Automated vulnerability scanner Nessus verified all 24 nodes are cleanly patched. TLS handshake latency decreased by 14ms following the cipher suite optimization."

Associated Git Commit:
acme-global/infrastructure@4a9f821 ("Upgrade OpenSSL 3.3.2 and lock TLS 1.3 only")

View issue on Atlassian Cloud:
https://acme-global.atlassian.net/browse/SEC-1092

Atlassian Cloud Notifications`,
    rawHeaders: `Received: from mail-atlassian.net (mail-atlassian.net [185.166.143.20])
    by mx.google.com with ESMTPS id jira-918230
    for <dharaneeshsk2007@gmail.com>; Sun, 20 Sep 2026 02:10:15 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=atlassian.net;
    spf=pass (sender IP 185.166.143.20 is permitted by atlassian.net);
    dmarc=pass (p=reject) header.from=atlassian.net
From: "Jira Software Cloud" <jira@acme-global.atlassian.net>
To: <dharaneeshsk2007@gmail.com>
Subject: Atlassian Jira: [SEC-1092] Zero-Day vulnerability mitigation deployed to production cluster
Date: Sun, 20 Sep 2026 02:10:07 +0000
Message-ID: <jira-sec-1092-20260920@atlassian.net>`,
    sha512: '8819283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019288',
    sha256: '9819283019283019283019283019283019283019283019283019283019283019',
    sha1: '8918273918273918273918273918273918273918',
    md5: '79182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'atlassian.net',
        clientIp: '185.166.143.20',
        record: 'v=spf1 include:_spf.atlassian.net ~all',
        aligned: true,
        explanation: 'SPF verified from Atlassian Cloud relay.'
      },
      dkim: {
        status: 'pass',
        domain: 'atlassian.net',
        selector: 's2023',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Valid cryptographic DKIM signature.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@atlassian.net',
      fromHeader: 'jira@acme-global.atlassian.net',
      replyToHeader: 'jira@acme-global.atlassian.net',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<jira-sec-1092-20260920@atlassian.net>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-atlassian.net',
        fromIP: '185.166.143.20',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-20T02:10:15Z',
        delayMs: 150,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '185.166.143.20',
          country: 'Australia',
          countryCode: 'AU',
          city: 'Sydney',
          region: 'New South Wales',
          lat: -33.8688,
          lng: 151.2093,
          isp: 'Atlassian Pty Ltd',
          asn: 'AS55959 ATLASSIAN',
          org: 'Atlassian Cloud Infrastructure',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '185.166.143.20',
      country: 'Australia',
      countryCode: 'AU',
      city: 'Sydney',
      region: 'New South Wales',
      lat: -33.8688,
      lng: 151.2093,
      isp: 'Atlassian Pty Ltd',
      asn: 'AS55959 ATLASSIAN',
      org: 'Atlassian Cloud Infrastructure',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'atlassian.net',
      registrar: 'MarkMonitor Inc.',
      creationDate: '2001-08-20T00:00:00Z',
      ageDays: 9162,
      expiryDate: '2028-08-20T00:00:00Z',
      nameServers: ['ns1.atlassian.net', 'ns2.atlassian.net'],
      mxRecords: ['10 mail.atlassian.net'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [],
    nlpAnalysis: {
      urgencyScore: 3,
      authorityImpersonationScore: 0,
      financialCoercionScore: 0,
      fearPressureScore: 0,
      detectedCues: ['Enterprise project tracker ticket status update', 'Authentic Atlassian infrastructure notification']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Atlassian Jira Enterprise Service',
      campaignCluster: 'JIRA-NOTIFICATIONS',
      reasoning: 'Authentic cryptographic signatures from Atlassian Pty Ltd.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Sydney, Australia'
    },
    chainOfCustody: [
      {
        id: 'coc-1007',
        timestamp: '2026-09-20T02:10:15Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: '9819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1008',
    caseNumber: 'CASE-BENIGN-1008',
    subject: 'Docker Hub: Automated security scan completed for acme/email-threat-agent:latest',
    senderDisplay: 'Docker Hub Automated Engine',
    senderAddress: 'hub-notifications@docker.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-20T03:45:00Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Hello Dharaneesh,

Docker Scout has completed the automated static and dynamic vulnerability analysis for your newly pushed container image:
acme/email-threat-agent:latest (digest: sha256:4a8b7c9d0e1f2a...)

Security Analysis Summary:
- Base OS: Alpine Linux 3.20.2
- Total Packages Inspected: 142
- Critical CVEs: 0
- High CVEs: 0
- Medium CVEs: 0
- Low/Informational: 1 (negligible non-exploitable memory offset)
- Docker Scout Health Grade: A+ (Safe for Cloud Run & Kubernetes Cluster Deployment)

You can inspect the full Software Bill of Materials (SBOM) and signed Sigstore provenance cosign attestation:
https://hub.docker.com/repository/docker/acme/email-threat-agent/scout

Docker Hub Security Team`,
    rawHeaders: `Received: from mail.docker.com (mail.docker.com [54.240.48.91])
    by mx.google.com with ESMTPS id docker-891273
    for <dharaneeshsk2007@gmail.com>; Sun, 20 Sep 2026 03:45:00 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=docker.com;
    spf=pass (sender IP 54.240.48.91 is permitted by docker.com);
    dmarc=pass (p=reject) header.from=docker.com
From: "Docker Hub Automated Engine" <hub-notifications@docker.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Docker Hub: Automated security scan completed for acme/email-threat-agent:latest
Date: Sun, 20 Sep 2026 03:44:52 +0000
Message-ID: <docker-scout-scan-20260920@docker.com>`,
    sha512: '9819283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019283019289',
    sha256: 'a819283019283019283019283019283019283019283019283019283019283019',
    sha1: '9918273918273918273918273918273918273918',
    md5: '89182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'docker.com',
        clientIp: '54.240.48.91',
        record: 'v=spf1 include:_spf.docker.com ~all',
        aligned: true,
        explanation: 'SPF verified from Docker Hub relay.'
      },
      dkim: {
        status: 'pass',
        domain: 'docker.com',
        selector: 's2022',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Valid cryptographic DKIM signature verified against Docker Inc DNS.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@docker.com',
      fromHeader: 'hub-notifications@docker.com',
      replyToHeader: 'hub-notifications@docker.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<docker-scout-scan-20260920@docker.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail.docker.com',
        fromIP: '54.240.48.91',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-20T03:45:00Z',
        delayMs: 120,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '54.240.48.91',
          country: 'United States',
          countryCode: 'US',
          city: 'Palo Alto',
          region: 'California',
          lat: 37.4419,
          lng: -122.143,
          isp: 'Amazon.com, Inc.',
          asn: 'AS16509 AMAZON-02',
          org: 'Docker Hub Container Services',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '54.240.48.91',
      country: 'United States',
      countryCode: 'US',
      city: 'Palo Alto',
      region: 'California',
      lat: 37.4419,
      lng: -122.143,
      isp: 'Amazon.com, Inc.',
      asn: 'AS16509 AMAZON-02',
      org: 'Docker Hub Container Services',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'docker.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '2007-06-25T17:00:00Z',
      ageDays: 7027,
      expiryDate: '2028-06-25T17:00:00Z',
      nameServers: ['ns1.docker.com', 'ns2.docker.com'],
      mxRecords: ['10 mail.docker.com'],
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
      detectedCues: ['Container registry vulnerability scan report', 'Authentic Docker Hub notification']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Docker Scout Automated Vulnerability Engine',
      campaignCluster: 'DOCKER-HUB-NOTIFICATIONS',
      reasoning: 'Authentic cryptographic signatures from Docker Inc.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Palo Alto, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1008',
        timestamp: '2026-09-20T03:45:00Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: 'a819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1009',
    caseNumber: 'CASE-BENIGN-1009',
    subject: 'Google Calendar: Quarterly Cyber Defense Strategy Review with CISO @ Wed Sep 23, 2pm',
    senderDisplay: 'Google Calendar',
    senderAddress: 'calendar-notification@google.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-20T05:15:30Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Quarterly Cyber Defense Strategy Review with CISO
When: Wednesday, Sep 23, 2026 2:00 PM - 3:00 PM (EDT)
Where: Google Meet (meet.google.com/ais-cyber-defense)

Attendees:
- Marcus Vance (Chief Information Security Officer) <m.vance@acme-global.com> - Organizer
- Dharaneesh S. K. <dharaneeshsk2007@gmail.com>
- Elena Rostova (Lead Incident Commander) <e.rostova@acme-global.com>
- Arthur Pendelton (Chief Financial Officer) <a.pendelton@acme-global.com>

Agenda:
1. Review Q3 BEC Wire Fraud interception metrics and prevention savings ($1.84M preserved).
2. Evaluate Consortium Proof-of-Authority Blockchain node peering performance across regional banks.
3. Review SOAR Automated Trigger policies and quarantine thresholds.
4. Next Steps for SOC 2 Type II and ISO/IEC 27037 compliance certifications.

Going? (Yes - Maybe - No)
https://calendar.google.com/calendar/event?eid=YWlzY3liZXI4OTIxODI5`,
    rawHeaders: `Received: from mail-cal.google.com (mail-cal.google.com [209.85.128.80])
    by mx.google.com with ESMTPS id cal-9812903
    for <dharaneeshsk2007@gmail.com>; Sun, 20 Sep 2026 05:15:30 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=google.com;
    spf=pass (sender IP 209.85.128.80 is permitted by _spf.google.com);
    dmarc=pass (p=reject) header.from=google.com
From: "Google Calendar" <calendar-notification@google.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Google Calendar: Quarterly Cyber Defense Strategy Review with CISO @ Wed Sep 23, 2pm
Date: Sun, 20 Sep 2026 05:15:22 +0000
Message-ID: <google-calendar-event-20260920@google.com>`,
    sha512: 'a81928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928a',
    sha256: 'b819283019283019283019283019283019283019283019283019283019283019',
    sha1: 'a918273918273918273918273918273918273918',
    md5: '99182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'google.com',
        clientIp: '209.85.128.80',
        record: 'v=spf1 include:_spf.google.com ~all',
        aligned: true,
        explanation: 'SPF verified from Google Workspace Calendar cluster.'
      },
      dkim: {
        status: 'pass',
        domain: 'google.com',
        selector: '20230601',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Cryptographic DKIM signature verified against Google DNS.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@google.com',
      fromHeader: 'calendar-notification@google.com',
      replyToHeader: 'calendar-notification@google.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<google-calendar-event-20260920@google.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail-cal.google.com',
        fromIP: '209.85.128.80',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-20T05:15:30Z',
        delayMs: 110,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '209.85.128.80',
          country: 'United States',
          countryCode: 'US',
          city: 'Mountain View',
          region: 'California',
          lat: 37.422,
          lng: -122.0841,
          isp: 'Google LLC',
          asn: 'AS15169 GOOGLE',
          org: 'Google Calendar Services',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '209.85.128.80',
      country: 'United States',
      countryCode: 'US',
      city: 'Mountain View',
      region: 'California',
      lat: 37.422,
      lng: -122.0841,
      isp: 'Google LLC',
      asn: 'AS15169 GOOGLE',
      org: 'Google Calendar Services',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'google.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1997-09-15T04:00:00Z',
      ageDays: 10597,
      expiryDate: '2028-09-13T04:00:00Z',
      nameServers: ['ns1.google.com', 'ns2.google.com'],
      mxRecords: ['10 smtp.google.com'],
      threatReputationScore: 0,
      isLookalike: false,
      punycode: false,
      knownMaliciousHistory: false
    },
    urls: [],
    attachments: [
      {
        filename: 'invite.ics',
        filesize: '4.2 KB',
        filetype: 'text/calendar',
        sha256: 'c819283019283019283019283019283019283019283019283019283019283019',
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
      detectedCues: ['Calendar invitation from verified organization', 'Authentic Google Workspace invitation']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Google Calendar Meeting Dispatcher',
      campaignCluster: 'GOOGLE-CALENDAR',
      reasoning: 'Authentic cryptographic signatures from Google LLC.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'Mountain View, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1009',
        timestamp: '2026-09-20T05:15:30Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: 'b819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  },
  {
    id: 'inc-inbox-1010',
    caseNumber: 'CASE-BENIGN-1010',
    subject: 'Vercel Deployment Succeeded: evi-mail-threat-defense.vercel.app (commit 38f01a9)',
    senderDisplay: 'Vercel Deployments',
    senderAddress: 'notifications@vercel.com',
    recipientAddress: 'dharaneeshsk2007@gmail.com',
    receivedAt: '2026-09-20T06:50:11Z',
    threatSeverity: 'benign',
    fraudScore: 1,
    classification: 'Legitimate',
    status: 'released',
    bodyText: `Your latest production deployment is live across all 34 global Edge locations!

Project: evi-mail-threat-defense
Domain: https://evi-mail-threat-defense.vercel.app
Branch: main (commit 38f01a9: "Integrate Process Flow Visualizer and RFC packet trace")
Build Duration: 24.2 seconds
Edge Cache Hit Ratio: 98.4%

Core Web Vitals Score:
- Largest Contentful Paint (LCP): 0.62s (Good)
- Interaction to Next Paint (INP): 24ms (Good)
- Cumulative Layout Shift (CLS): 0.001 (Good)

View build logs, serverless execution metrics, and preview URL:
https://vercel.com/dharaneesh/evi-mail-threat-defense/deployments/dpl_89129031

Vercel Automated CI/CD Engine`,
    rawHeaders: `Received: from mail.vercel.com (mail.vercel.com [76.76.21.21])
    by mx.google.com with ESMTPS id vercel-918230
    for <dharaneeshsk2007@gmail.com>; Sun, 20 Sep 2026 06:50:11 +0000 (UTC)
Authentication-Results: mx.google.com;
    dkim=pass header.d=vercel.com;
    spf=pass (sender IP 76.76.21.21 is permitted by vercel.com);
    dmarc=pass (p=reject) header.from=vercel.com
From: "Vercel Deployments" <notifications@vercel.com>
To: <dharaneeshsk2007@gmail.com>
Subject: Vercel Deployment Succeeded: evi-mail-threat-defense.vercel.app (commit 38f01a9)
Date: Sun, 20 Sep 2026 06:50:03 +0000
Message-ID: <vercel-deploy-20260920@vercel.com>`,
    sha512: 'b81928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928301928b',
    sha256: 'c819283019283019283019283019283019283019283019283019283019283019',
    sha1: 'b918273918273918273918273918273918273918',
    md5: 'a9182739182739182739182739182739',
    protocols: {
      spf: {
        status: 'pass',
        domain: 'vercel.com',
        clientIp: '76.76.21.21',
        record: 'v=spf1 include:_spf.vercel.com ~all',
        aligned: true,
        explanation: 'SPF verified from Vercel edge deployment relay.'
      },
      dkim: {
        status: 'pass',
        domain: 'vercel.com',
        selector: 'v1',
        signatureHeaderValid: true,
        bodyHashValid: true,
        aligned: true,
        explanation: 'Cryptographic DKIM signature verified against Vercel Inc DNS.'
      },
      dmarc: {
        status: 'pass',
        policy: 'reject',
        alignment: 'aligned',
        disposition: 'pass',
        explanation: 'Strict DMARC policy passed.'
      },
      returnPathMatch: true,
      returnPath: 'bounces@vercel.com',
      fromHeader: 'notifications@vercel.com',
      replyToHeader: 'notifications@vercel.com',
      replyToMismatch: false,
      messageIdAnomaly: false,
      messageId: '<vercel-deploy-20260920@vercel.com>',
      tlsVersion: 'TLSv1.3',
      cipherSuite: 'TLS_AES_256_GCM_SHA384',
      forgedSenderSuspected: false
    },
    relayHops: [
      {
        hopNumber: 1,
        fromHost: 'mail.vercel.com',
        fromIP: '76.76.21.21',
        byHost: 'mx.google.com',
        protocol: 'ESMTPS',
        timestamp: '2026-09-20T06:50:11Z',
        delayMs: 98,
        isOriginating: true,
        isAnomalous: false,
        geo: {
          ip: '76.76.21.21',
          country: 'United States',
          countryCode: 'US',
          city: 'San Francisco',
          region: 'California',
          lat: 37.7749,
          lng: -122.4194,
          isp: 'Vercel Inc.',
          asn: 'AS396982 VERCEL',
          org: 'Vercel Edge Global Network',
          isTor: false,
          isVpn: false,
          isProxy: false,
          isCloudHosting: true,
          threatScore: 1
        }
      }
    ],
    originatingGeo: {
      ip: '76.76.21.21',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      region: 'California',
      lat: 37.7749,
      lng: -122.4194,
      isp: 'Vercel Inc.',
      asn: 'AS396982 VERCEL',
      org: 'Vercel Edge Global Network',
      isTor: false,
      isVpn: false,
      isProxy: false,
      isCloudHosting: true,
      threatScore: 1
    },
    domainIntel: {
      domain: 'vercel.com',
      registrar: 'MarkMonitor Inc.',
      creationDate: '1999-07-29T19:00:00Z',
      ageDays: 9915,
      expiryDate: '2029-07-29T19:00:00Z',
      nameServers: ['ns1.vercel-dns.com', 'ns2.vercel-dns.com'],
      mxRecords: ['10 mail.vercel.com'],
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
      detectedCues: ['Automated serverless deployment build status', 'Authentic Vercel developer notification']
    },
    attribution: {
      category: 'Compromised Account',
      confidenceScore: 99,
      probableActorOrSyndicate: 'Vercel Automated Deployment Pipeline',
      campaignCluster: 'VERCEL-BUILDS',
      reasoning: 'Authentic cryptographic signatures from Vercel Inc.',
      mitreAttackTechniques: [],
      actorOriginEstimate: 'San Francisco, CA, USA'
    },
    chainOfCustody: [
      {
        id: 'coc-1010',
        timestamp: '2026-09-20T06:50:11Z',
        actor: 'Google Inbound MX',
        action: 'Clean Ingestion & DKIM Verification',
        details: 'Passed all SPF, DKIM, and DMARC alignment checks cleanly.',
        verificationHash: 'c819283019283019283019283019283019283019283019283019283019283019'
      }
    ],
    mitigationHistory: []
  }
];
