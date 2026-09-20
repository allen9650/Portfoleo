import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Network, 
  Hash, 
  HardDrive, 
  Gauge, 
  Clock, 
  Video, 
  ShieldCheck, 
  Copy, 
  Check, 
  Search, 
  Sliders, 
  Info, 
  Sparkles, 
  Calculator, 
  Server, 
  Activity, 
  ArrowRight, 
  RefreshCw, 
  FileText, 
  Upload, 
  AlertTriangle,
  Radio,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  Share2,
  Globe,
  ExternalLink,
  Terminal
} from 'lucide-react';
import { computeHash } from '../utils/hashUtils';

export default function ToolsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Active Tool Tabs: 'port-checker' | 'hash-generator' | 'bandwidth' | 'cctv'
  const [activeTab, setActiveTab] = useState('port-checker');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const toolParam = params.get('tool');
    if (toolParam && ['port-checker', 'hash-generator', 'bandwidth', 'cctv'].includes(toolParam)) {
      setActiveTab(toolParam);
    } else if (location.hash) {
      const hashClean = location.hash.replace('#', '');
      if (['port-checker', 'hash-generator', 'bandwidth', 'cctv'].includes(hashClean)) {
        setActiveTab(hashClean);
      }
    }
  }, [location]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/tools?tool=${tab}`, { replace: true });
  };

  // ==========================================
  // 1. PORT CHECKER & DIRECTORY STATE
  // ==========================================
  const [portHost, setPortHost] = useState('scanme.nmap.org');
  const [portNumber, setPortNumber] = useState('80');
  const [probeStatus, setProbeStatus] = useState(null); // 'checking' | 'open' | 'closed' | 'timeout' | 'unknown-host' | 'browser-restricted' | 'error'
  const [probeLatency, setProbeLatency] = useState(null);
  const [probeDetails, setProbeDetails] = useState(null);
  const [isDetectingIp, setIsDetectingIp] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [directorySearch, setDirectorySearch] = useState('');

  const RESTRICTED_BROWSER_PORTS = [
    1, 7, 9, 11, 13, 15, 17, 19, 20, 21, 22, 23, 25, 37, 42, 43, 53, 77, 79, 87, 95,
    101, 102, 103, 104, 109, 110, 111, 113, 115, 117, 119, 123, 135, 139, 143, 179,
    389, 465, 512, 513, 514, 515, 526, 530, 531, 532, 540, 556, 563, 587, 601, 636,
    993, 995, 2049, 3659, 4045, 6000, 6665, 6666, 6667, 6668, 6669, 6697
  ];

  const isPrivateHost = (rawHost) => {
    const h = (rawHost || '').trim().toLowerCase().replace(/^https?:\/\//i, '').split('/')[0].split(':')[0];
    if (!h || h === 'localhost' || h === '127.0.0.1' || h.startsWith('127.')) return true;
    if (/^192\.168\./.test(h)) return true;
    if (/^10\./.test(h)) return true;
    if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(h)) return true;
    return false;
  };

  const handleDetectPublicIp = async () => {
    setIsDetectingIp(true);
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      if (res.ok) {
        const data = await res.json();
        if (data && data.ip) {
          setPortHost(data.ip);
        }
      }
    } catch (e) {
      console.error('Failed to detect public IP:', e);
    } finally {
      setIsDetectingIp(false);
    }
  };

  const copyCommandToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const commonPorts = [
    { port: 21, name: 'FTP', proto: 'TCP', risk: 'High', desc: 'File Transfer Protocol (Cleartext credentials risk)', fire: 'Block on WAN; use SFTP (Port 22)' },
    { port: 22, name: 'SSH / SFTP', proto: 'TCP', risk: 'Medium', desc: 'Secure Shell remote terminal access and encrypted SFTP', fire: 'Allow only via VPN or restricted IP whitelist' },
    { port: 23, name: 'Telnet', proto: 'TCP', risk: 'Critical', desc: 'Unencrypted terminal protocol vulnerable to packet sniffing', fire: 'Block completely; replace with SSH' },
    { port: 25, name: 'SMTP', proto: 'TCP', risk: 'Medium', desc: 'Simple Mail Transfer Protocol for MTA mail routing', fire: 'Outbound port 25 often blocked by consumer ISPs' },
    { port: 53, name: 'DNS', proto: 'UDP/TCP', risk: 'Low', desc: 'Domain Name System name resolution', fire: 'Allow outbound 53; restrict inbound to authoritative DNS' },
    { port: 80, name: 'HTTP', proto: 'TCP', risk: 'Low', desc: 'Standard unencrypted Hypertext Transfer Protocol', fire: 'Allow for web servers with 301 redirect to HTTPS (443)' },
    { port: 110, name: 'POP3', proto: 'TCP', risk: 'High', desc: 'Post Office Protocol mail retrieval (unencrypted)', fire: 'Upgrade to POP3S (Port 995 SSL/TLS)' },
    { port: 143, name: 'IMAP', proto: 'TCP', risk: 'High', desc: 'Internet Message Access Protocol mail synchronization', fire: 'Upgrade to IMAPS (Port 993 SSL/TLS)' },
    { port: 443, name: 'HTTPS', proto: 'TCP', risk: 'Low', desc: 'HTTP over TLS/SSL encryption for modern secure web traffic', fire: 'Allow inbound for web servers' },
    { port: 445, name: 'SMB', proto: 'TCP', risk: 'Critical', desc: 'Server Message Block file sharing (WannaCry / EternalBlue vector)', fire: 'Block unconditionally at all WAN edge firewalls' },
    { port: 554, name: 'RTSP', proto: 'TCP/UDP', risk: 'Medium', desc: 'Real-Time Streaming Protocol used by IP CCTV camera feeds', fire: 'Isolate on dedicated CCTV VLAN; do not expose to public WAN' },
    { port: 993, name: 'IMAPS', proto: 'TCP', risk: 'Low', desc: 'Secure IMAP over TLS encrypted mail delivery', fire: 'Allow outbound for mail clients' },
    { port: 1433, name: 'MS SQL Server', proto: 'TCP', risk: 'High', desc: 'Microsoft SQL Server database listening port', fire: 'Never expose to WAN; isolate on DB backend subnet' },
    { port: 3306, name: 'MySQL / MariaDB', proto: 'TCP', risk: 'High', desc: 'MySQL relational database listening port', fire: 'Bind to 127.0.0.1 or secure internal VLAN only' },
    { port: 3389, name: 'RDP', proto: 'TCP/UDP', risk: 'Critical', desc: 'Microsoft Remote Desktop Protocol (Frequent ransomware brute-force target)', fire: 'Never expose raw 3389 to internet; mandate VPN or RD Gateway' },
    { port: 5432, name: 'PostgreSQL', proto: 'TCP', risk: 'High', desc: 'PostgreSQL relational database service', fire: 'Internal subnet access only' },
    { port: 8080, name: 'HTTP Alternate', proto: 'TCP', risk: 'Low', desc: 'Common alternate port for dev web servers, proxies, and Tomcat', fire: 'Permit as required by application architecture' },
    { port: 8443, name: 'HTTPS Alternate', proto: 'TCP', risk: 'Low', desc: 'Common alternate port for HTTPS web management portals', fire: 'Allow for administrative subnets' },
    { port: 27017, name: 'MongoDB', proto: 'TCP', risk: 'High', desc: 'Default port for MongoDB document database instances', fire: 'Bind to private IP with mandatory SCRAM-SHA-256 auth' }
  ];

  const handleTestPort = async () => {
    setProbeStatus('checking');
    setProbeLatency(null);
    setProbeDetails(null);

    const cleanHost = portHost.trim().replace(/^https?:\/\//i, '').split('/')[0].split(':')[0];
    const targetPort = parseInt(portNumber, 10);

    if (!cleanHost) {
      setProbeStatus('error');
      setProbeDetails({ message: 'Please enter a valid hostname or IP address.' });
      return;
    }

    if (isNaN(targetPort) || targetPort < 1 || targetPort > 65535) {
      setProbeStatus('error');
      setProbeDetails({ message: 'Please enter a port number between 1 and 65535.' });
      return;
    }

    // PRIMARY ENGINE: Native TCP Socket API (/api/check-port)
    // Instant TCP 3-way handshake in Vite local dev and Vercel serverless production
    try {
      const nativeController = new AbortController();
      const nativeTimeout = setTimeout(() => nativeController.abort(), 4500);
      const nativeRes = await fetch(`/api/check-port?host=${encodeURIComponent(cleanHost)}&port=${targetPort}`, {
        signal: nativeController.signal
      });
      clearTimeout(nativeTimeout);

      if (nativeRes.ok) {
        const data = await nativeRes.json();
        if (data && data.status) {
          setProbeStatus(data.status);
          setProbeLatency(data.latency !== undefined ? data.latency : null);
          setProbeDetails({
            cleanHost,
            targetPort,
            latency: data.latency,
            message: data.message || `Port ${targetPort} is ${data.status.toUpperCase()} on ${cleanHost}`,
            engine: 'Native TCP Socket Engine',
            powershell: `Test-NetConnection -ComputerName ${cleanHost} -Port ${targetPort}`,
            bash: `nc -zv ${cleanHost} ${targetPort}`,
            externalCheckUrl: `https://portchecker.co/check?target_ip=${encodeURIComponent(cleanHost)}&port=${targetPort}`
          });
          return;
        }
      }
    } catch (nativeErr) {
      // Fall through to fallback engine if static export without backend
    }

    // SCENARIO 1: Private Subnet / Localhost
    if (isPrivateHost(cleanHost)) {
      if (RESTRICTED_BROWSER_PORTS.includes(targetPort)) {
        setProbeStatus('browser-restricted');
        setProbeDetails({
          cleanHost,
          targetPort,
          message: `Port ${targetPort} is blocked by browser security (ERR_UNSAFE_PORT) to protect your local machine. Use native terminal diagnostics below:`,
          powershell: `Test-NetConnection -ComputerName ${cleanHost} -Port ${targetPort}`,
          bash: `nc -zv ${cleanHost} ${targetPort}`
        });
        return;
      }

      // Standard dev / web ports on localhost
      const start = performance.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        const protocol = targetPort === 443 || targetPort === 8443 ? 'https' : 'http';
        await fetch(`${protocol}://${cleanHost}:${targetPort}`, {
          method: 'GET',
          mode: 'no-cors',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const elapsed = Math.round(performance.now() - start);
        setProbeLatency(elapsed);
        setProbeStatus('open');
        setProbeDetails({
          cleanHost,
          targetPort,
          message: `Port ${targetPort} is OPEN on ${cleanHost}. Local service responded in ${elapsed}ms.`
        });
      } catch (err) {
        const elapsed = Math.round(performance.now() - start);
        setProbeLatency(elapsed);
        if (err.name === 'AbortError') {
          setProbeStatus('timeout');
          setProbeDetails({
            cleanHost,
            targetPort,
            message: `Connection timed out after 2s. No local listener responded on ${cleanHost}:${targetPort}.`
          });
        } else {
          setProbeStatus('closed');
          setProbeDetails({
            cleanHost,
            targetPort,
            message: `Connection refused or host unreachable. No service (Docker, Node, Apache, Nginx) is listening on port ${targetPort}.`,
            powershell: `Test-NetConnection -ComputerName ${cleanHost} -Port ${targetPort}`,
            bash: `nc -zv ${cleanHost} ${targetPort}`
          });
        }
      }
      return;
    }

    // SCENARIO 2: Fallback WAN / Public IP / Domain Check via Check-Host Global Multi-Node Engine
    try {
      const initRes = await fetch(`https://check-host.net/check-tcp?host=${encodeURIComponent(cleanHost)}:${targetPort}&max_nodes=4`, {
        headers: { 'Accept': 'application/json' }
      });

      if (!initRes.ok) {
        throw new Error(`Public probe API returned HTTP ${initRes.status}`);
      }

      const initData = await initRes.json();
      if (!initData || !initData.request_id) {
        throw new Error('Could not initiate global TCP check');
      }

      const { request_id, nodes, permanent_link } = initData;

      // Poll for node completion
      let finalResults = null;
      for (let attempt = 0; attempt < 5; attempt++) {
        await new Promise(r => setTimeout(r, 900));
        const pollRes = await fetch(`https://check-host.net/check-result/${request_id}`, {
          headers: { 'Accept': 'application/json' }
        });
        if (pollRes.ok) {
          const pollData = await pollRes.json();
          if (pollData && Object.values(pollData).some(v => v !== null)) {
            finalResults = pollData;
            break;
          }
        }
      }

      if (!finalResults) {
        setProbeStatus('timeout');
        setProbeDetails({
          permanentLink: permanent_link,
          message: `Global nodes are still completing the TCP 3-way handshake. View live report below.`
        });
        return;
      }

      const nodeDetails = [];
      let hasOpen = false;
      let hasRefused = false;
      let hasTimeout = false;
      let hasUnknownHost = false;
      let resolvedIp = null;
      let minLatency = 999999;

      Object.entries(finalResults).forEach(([nodeKey, nodeData]) => {
        const nodeMeta = nodes[nodeKey] || [];
        const countryCode = nodeMeta[0] || 'globe';
        const countryName = nodeMeta[1] || 'Global Node';
        const cityName = nodeMeta[2] || '';

        if (Array.isArray(nodeData) && nodeData.length > 0) {
          const item = nodeData[0];
          if (item.address) resolvedIp = item.address;

          if (item.time !== undefined && item.time !== null) {
            hasOpen = true;
            const latMs = Math.round(item.time * 1000);
            if (latMs < minLatency) minLatency = latMs;
            nodeDetails.push({
              nodeKey,
              countryCode,
              countryName,
              cityName,
              status: 'open',
              latency: latMs,
              error: null
            });
          } else if (item.error) {
            const errLower = item.error.toLowerCase();
            let statusType = 'timeout';
            if (errLower.includes('refused')) {
              hasRefused = true;
              statusType = 'refused';
            } else if (errLower.includes('unknown') || errLower.includes('host')) {
              hasUnknownHost = true;
              statusType = 'unknown-host';
            } else {
              hasTimeout = true;
              statusType = 'timeout';
            }

            nodeDetails.push({
              nodeKey,
              countryCode,
              countryName,
              cityName,
              status: statusType,
              latency: null,
              error: item.error
            });
          }
        }
      });

      if (hasOpen) {
        setProbeStatus('open');
        setProbeLatency(minLatency === 999999 ? 50 : minLatency);
        setProbeDetails({
          cleanHost,
          targetPort,
          resolvedIp,
          permanentLink: permanent_link,
          nodeResults: nodeDetails,
          message: `Port ${targetPort} is OPEN & ACCESSIBLE from the public internet.`
        });
      } else if (hasUnknownHost) {
        setProbeStatus('unknown-host');
        setProbeDetails({
          cleanHost,
          targetPort,
          permanentLink: permanent_link,
          nodeResults: nodeDetails,
          message: `DNS could not resolve "${cleanHost}". Please verify the domain name or IPv4 address.`
        });
      } else if (hasRefused) {
        setProbeStatus('closed');
        setProbeDetails({
          cleanHost,
          targetPort,
          resolvedIp,
          permanentLink: permanent_link,
          nodeResults: nodeDetails,
          message: `Port ${targetPort} is CLOSED (Connection Refused). The server at ${resolvedIp || cleanHost} is online, but no service is listening on port ${targetPort}.`
        });
      } else {
        setProbeStatus('timeout');
        setProbeDetails({
          cleanHost,
          targetPort,
          resolvedIp,
          permanentLink: permanent_link,
          nodeResults: nodeDetails,
          message: `Port ${targetPort} TIMED OUT / FILTERED. No TCP ACK was returned. This usually means a firewall, NAT router, or ISP dropped the connection.`
        });
      }
    } catch (wanErr) {
      console.error('WAN Port check error:', wanErr);
      setProbeStatus('error');
      setProbeDetails({
        cleanHost,
        targetPort,
        message: `Global public sensor connection failed (${wanErr.message}). You can test instantly via PortChecker.co or run terminal diagnostics:`,
        externalCheckUrl: `https://portchecker.co/check?target_ip=${encodeURIComponent(cleanHost)}&port=${targetPort}`,
        powershell: `Test-NetConnection -ComputerName ${cleanHost} -Port ${targetPort}`,
        bash: `nc -zv ${cleanHost} ${targetPort}`
      });
    }
  };

  const filteredPorts = useMemo(() => {
    if (!directorySearch.trim()) return commonPorts;
    const q = directorySearch.toLowerCase();
    return commonPorts.filter(
      p => p.port.toString().includes(q) || 
           p.name.toLowerCase().includes(q) || 
           p.desc.toLowerCase().includes(q)
    );
  }, [directorySearch]);

  // ==========================================
  // 2. HASH GENERATOR & VERIFIER STATE
  // ==========================================
  const [hashInputText, setHashInputText] = useState('Ahsan Raza Enterprise IT Security');
  const [hashFile, setHashFile] = useState(null);
  const [hashMode, setHashMode] = useState('text'); // 'text' | 'file'
  const [calculatedHashes, setCalculatedHashes] = useState({
    MD5: '',
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': ''
  });
  const [compareHash, setCompareHash] = useState('');
  const [copiedHashKey, setCopiedHashKey] = useState(null);
  const [isUppercase, setIsUppercase] = useState(false);
  const [isHashing, setIsHashing] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    async function runHashes() {
      setIsHashing(true);
      try {
        let inputData;
        if (hashMode === 'file' && hashFile) {
          inputData = await hashFile.arrayBuffer();
        } else {
          inputData = hashInputText;
        }

        const [md5H, sha1H, sha256H, sha384H, sha512H] = await Promise.all([
          computeHash('MD5', inputData),
          computeHash('SHA-1', inputData),
          computeHash('SHA-256', inputData),
          computeHash('SHA-384', inputData),
          computeHash('SHA-512', inputData)
        ]);

        if (isCurrent) {
          setCalculatedHashes({
            MD5: md5H,
            'SHA-1': sha1H,
            'SHA-256': sha256H,
            'SHA-384': sha384H,
            'SHA-512': sha512H
          });
          setIsHashing(false);
        }
      } catch (e) {
        console.error('Hash calculation error:', e);
        if (isCurrent) setIsHashing(false);
      }
    }

    runHashes();
    return () => { isCurrent = false; };
  }, [hashInputText, hashFile, hashMode]);

  const handleCopyHash = (val, key) => {
    navigator.clipboard.writeText(isUppercase ? val.toUpperCase() : val.toLowerCase());
    setCopiedHashKey(key);
    setTimeout(() => setCopiedHashKey(null), 2000);
  };

  const checksumMatch = useMemo(() => {
    if (!compareHash.trim()) return null;
    const cleanCompare = compareHash.trim().toLowerCase();
    for (const [algo, hashVal] of Object.entries(calculatedHashes)) {
      if (hashVal && hashVal.toLowerCase() === cleanCompare) {
        return { match: true, algorithm: algo };
      }
    }
    return { match: false };
  }, [compareHash, calculatedHashes]);

  // ==========================================
  // 3. BANDWIDTH CALCULATOR STATE
  // ==========================================
  const [bwCalcMode, setBwCalcMode] = useState('transfer'); // 'transfer' | 'converter' | 'users'
  
  // Transfer Time Inputs
  const [fileSize, setFileSize] = useState(10);
  const [fileSizeUnit, setFileSizeUnit] = useState('GB'); // 'MB' | 'GB' | 'TB'
  const [netSpeed, setNetSpeed] = useState(100);
  const [netSpeedUnit, setNetSpeedUnit] = useState('Mbps'); // 'Kbps' | 'Mbps' | 'Gbps'
  const [overheadPct, setOverheadPct] = useState(10); // TCP/IP overhead %

  const transferCalcResult = useMemo(() => {
    // Convert file size to bits
    let sizeInBytes = Number(fileSize) || 0;
    if (fileSizeUnit === 'MB') sizeInBytes *= 1024 * 1024;
    else if (fileSizeUnit === 'GB') sizeInBytes *= 1024 * 1024 * 1024;
    else if (fileSizeUnit === 'TB') sizeInBytes *= 1024 * 1024 * 1024 * 1024;

    const totalBits = sizeInBytes * 8;

    // Convert speed to bits per second
    let speedInBps = Number(netSpeed) || 0;
    if (netSpeedUnit === 'Kbps') speedInBps *= 1000;
    else if (netSpeedUnit === 'Mbps') speedInBps *= 1000000;
    else if (netSpeedUnit === 'Gbps') speedInBps *= 1000000000;

    if (speedInBps <= 0 || totalBits <= 0) {
      return { seconds: 0, formatted: '0s', byteRateMBs: 0 };
    }

    // Effective speed with overhead
    const effectiveBps = speedInBps * (1 - overheadPct / 100);
    const totalSeconds = totalBits / effectiveBps;

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);

    let parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    const byteRate = (speedInBps / 8) / (1024 * 1024); // MB/s

    return {
      seconds: totalSeconds,
      formatted: parts.join(' '),
      byteRateMBs: byteRate.toFixed(2),
      effectiveRateMBs: (byteRate * (1 - overheadPct / 100)).toFixed(2)
    };
  }, [fileSize, fileSizeUnit, netSpeed, netSpeedUnit, overheadPct]);

  // Converter State
  const [convertValue, setConvertValue] = useState(100);
  const [convertUnit, setConvertUnit] = useState('Mbps');

  const convertedUnits = useMemo(() => {
    const val = Number(convertValue) || 0;
    // Base in bps
    let baseBps = val;
    switch (convertUnit) {
      case 'bps': baseBps = val; break;
      case 'Kbps': baseBps = val * 1e3; break;
      case 'Mbps': baseBps = val * 1e6; break;
      case 'Gbps': baseBps = val * 1e9; break;
      case 'B/s': baseBps = val * 8; break;
      case 'KB/s': baseBps = val * 8 * 1024; break;
      case 'MB/s': baseBps = val * 8 * 1024 * 1024; break;
      case 'GB/s': baseBps = val * 8 * 1024 * 1024 * 1024; break;
      default: baseBps = val * 1e6;
    }

    return {
      bps: baseBps.toLocaleString(),
      Kbps: (baseBps / 1e3).toLocaleString(undefined, { maximumFractionDigits: 2 }),
      Mbps: (baseBps / 1e6).toLocaleString(undefined, { maximumFractionDigits: 2 }),
      Gbps: (baseBps / 1e9).toLocaleString(undefined, { maximumFractionDigits: 4 }),
      'B/s': (baseBps / 8).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      'KB/s': (baseBps / (8 * 1024)).toLocaleString(undefined, { maximumFractionDigits: 2 }),
      'MB/s': (baseBps / (8 * 1024 * 1024)).toLocaleString(undefined, { maximumFractionDigits: 2 }),
      'GB/s': (baseBps / (8 * 1024 * 1024 * 1024)).toLocaleString(undefined, { maximumFractionDigits: 4 })
    };
  }, [convertValue, convertUnit]);

  // Concurrent User Planner
  const [userCount, setUserCount] = useState(150);
  const [userProfile, setUserProfile] = useState(5); // Mbps per user (e.g. video conferencing / campus browsing)
  const [contentionRatio, setContentionRatio] = useState(10); // 1:10 contention

  const userBandwidthPlan = useMemo(() => {
    const peak = userCount * userProfile;
    const committedRate = Math.round(peak / (contentionRatio / 2));
    const recommendedISP = Math.max(100, Math.ceil(committedRate / 50) * 50);
    return {
      peakMbps: peak,
      committedMbps: committedRate,
      recommendedISP: recommendedISP
    };
  }, [userCount, userProfile, contentionRatio]);

  // ==========================================
  // 4. CCTV STORAGE CALCULATOR STATE
  // ==========================================
  const [numCameras, setNumCameras] = useState(16);
  const [resolution, setResolution] = useState('1080p'); // 720p, 1080p, 4MP, 4K, 12MP
  const [codec, setCodec] = useState('H265'); // H264, H265, H265+
  const [fps, setFps] = useState(20);
  const [hoursPerDay, setHoursPerDay] = useState(24);
  const [retentionDays, setRetentionDays] = useState(30);
  const [includeAudio, setIncludeAudio] = useState(true);

  // Baseline bitrates in Kbps at 25 fps on H.264
  const resBitrateMap = {
    '720p': 2048,
    '1080p': 4096, // 4 Mbps standard for 1080p Full HD
    '4MP': 6144,  // 2K Quad HD
    '4K': 12288,  // 8MP Ultra HD
    '12MP': 18432 // Panoramic / Fisheye
  };

  const cctvResults = useMemo(() => {
    const baseBitrate = resBitrateMap[resolution] || 4096;

    // Codec efficiency factor
    let codecMultiplier = 1.0;
    if (codec === 'H265') codecMultiplier = 0.50; // 50% savings
    if (codec === 'H265+') codecMultiplier = 0.35; // 65% savings (Smart Codec)

    // FPS scaling factor (baseline 25 fps)
    const fpsMultiplier = Math.max(0.4, fps / 25);

    // Single camera video bitrate in Kbps
    let singleCamVideoKbps = baseBitrate * codecMultiplier * fpsMultiplier;
    if (includeAudio) {
      singleCamVideoKbps += 64; // standard G.711 / AAC audio stream
    }

    const singleCamMbps = (singleCamVideoKbps / 1000).toFixed(2);
    const totalMatrixBandwidthMbps = ((singleCamVideoKbps * numCameras) / 1000).toFixed(1);

    // Daily storage calculation: (Kbps * 1000 / 8) * (hoursPerDay * 3600) = Bytes
    const bytesPerSecondPerCam = (singleCamVideoKbps * 1000) / 8;
    const dailyBytesPerCam = bytesPerSecondPerCam * (hoursPerDay * 3600);
    const totalDailyGB = (dailyBytesPerCam * numCameras) / (1024 * 1024 * 1024);

    const totalRawGB = totalDailyGB * retentionDays;
    const totalRawTB = totalRawGB / 1024;

    // Recommend Surveillance HDDs (8TB or 12TB drives)
    const driveSizeTB = 8;
    const neededDataDrives = Math.ceil(totalRawTB / driveSizeTB);
    // RAID 5 recommendation (+1 parity drive)
    const raid5TotalDrives = neededDataDrives + 1;

    return {
      singleCamMbps,
      totalMatrixBandwidthMbps,
      totalDailyGB: totalDailyGB.toFixed(1),
      totalRawGB: Math.round(totalRawGB).toLocaleString(),
      totalRawTB: totalRawTB.toFixed(2),
      driveSizeTB,
      neededDataDrives: Math.max(1, neededDataDrives),
      raid5TotalDrives: Math.max(2, raid5TotalDrives)
    };
  }, [numCameras, resolution, codec, fps, hoursPerDay, retentionDays, includeAudio]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 animate-fade-in-up">
      {/* 1. SEO Rich Snippet Structured JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "name": "Network Port Checker & Risk Directory",
              "url": "https://ahsanraza-tech.github.io/tools?tool=port-checker",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "description": "Interactive TCP/UDP port scanner test, port reference database, and firewall mitigation recommendations."
            },
            {
              "@type": "WebApplication",
              "name": "Cryptographic Hash Generator & Verifier",
              "url": "https://ahsanraza-tech.github.io/tools?tool=hash-generator",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "All",
              "description": "Client-side Web Crypto API hash generator supporting MD5, SHA-1, SHA-256, SHA-384, and SHA-512 with checksum verification."
            },
            {
              "@type": "WebApplication",
              "name": "Bandwidth & Data Transfer Time Calculator",
              "url": "https://ahsanraza-tech.github.io/tools?tool=bandwidth",
              "applicationCategory": "NetworkingApplication",
              "operatingSystem": "All",
              "description": "Calculate file download/upload times with TCP overhead, unit conversion (Mbps, MB/s, Gbps), and concurrent network sizing."
            },
            {
              "@type": "WebApplication",
              "name": "IP CCTV Surveillance Storage & Bandwidth Calculator",
              "url": "https://ahsanraza-tech.github.io/tools?tool=cctv",
              "applicationCategory": "SecurityApplication",
              "operatingSystem": "All",
              "description": "Calculate NVR surveillance hard drive storage, daily consumption, and network bandwidth for H.264, H.265, and H.265+ security cameras."
            }
          ]
        })
      }} />

      {/* 2. Top Header & SEO Title */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-mono">
          <Zap className="w-3.5 h-3.5" />
          <span>06. NETWORK & SYSADMIN TOOLKIT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          IT & Network Engineering Tools
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          High-precision, browser-native calculation and security diagnostic utilities designed for network engineers, cybersecurity analysts, and IT infrastructure officers.
        </p>
      </div>

      {/* 3. Interactive Tool Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 max-w-3xl mx-auto">
        <button
          onClick={() => handleTabChange('port-checker')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'port-checker'
              ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-sm border border-cyan-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Port Checker</span>
        </button>

        <button
          onClick={() => handleTabChange('hash-generator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'hash-generator'
              ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-sm border border-cyan-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>Hash Generator</span>
        </button>

        <button
          onClick={() => handleTabChange('bandwidth')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'bandwidth'
              ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-sm border border-cyan-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>Bandwidth Calculator</span>
        </button>

        <button
          onClick={() => handleTabChange('cctv')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'cctv'
              ? 'bg-white dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400 shadow-sm border border-cyan-500/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>CCTV Storage</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PORT CHECKER & RISK DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'port-checker' && (
        <div className="space-y-10 animate-fade-in">
          {/* Main Port Tester Card */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-5">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider block">
                  Diagnostic Utility
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Port Connectivity & Threat Assessment
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <Globe className="w-4 h-4 text-cyan-500" />
                <span>Global Multi-Node TCP Engine</span>
              </div>
            </div>

            {/* Input Controls */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                      Target Hostname or IP:
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDetectPublicIp}
                        disabled={isDetectingIp}
                        className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        title="Auto-detect your public WAN IP address"
                      >
                        {isDetectingIp ? (
                          <RefreshCw className="w-3 h-3 animate-spin" />
                        ) : (
                          <Radio className="w-3 h-3" />
                        )}
                        <span>Detect My Public IP</span>
                      </button>
                      <span className="text-slate-300 dark:text-neutral-700">|</span>
                      <button
                        type="button"
                        onClick={() => setPortHost('scanme.nmap.org')}
                        className="text-[11px] font-mono text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer"
                        title="Use official Nmap test target"
                      >
                        nmap.org
                      </button>
                      <span className="text-slate-300 dark:text-neutral-700">|</span>
                      <button
                        type="button"
                        onClick={() => setPortHost('localhost')}
                        className="text-[11px] font-mono text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 cursor-pointer"
                        title="Test local loopback"
                      >
                        localhost
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={portHost}
                    onChange={(e) => setPortHost(e.target.value)}
                    placeholder="e.g. scanme.nmap.org, 192.168.1.1, google.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-3 space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                    Port Number:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="65535"
                    value={portNumber}
                    onChange={(e) => setPortNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <button
                    onClick={handleTestPort}
                    disabled={probeStatus === 'checking'}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {probeStatus === 'checking' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Probing Handshake...</span>
                      </>
                    ) : (
                      <>
                        <Radio className="w-4 h-4" />
                        <span>Check Port</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Port Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">
                  Quick Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { p: 80, label: 'HTTP (80)' },
                    { p: 443, label: 'HTTPS (443)' },
                    { p: 22, label: 'SSH (22)' },
                    { p: 21, label: 'FTP (21)' },
                    { p: 25, label: 'SMTP (25)' },
                    { p: 53, label: 'DNS (53)' },
                    { p: 554, label: 'RTSP CCTV (554)' },
                    { p: 3306, label: 'MySQL (3306)' },
                    { p: 3389, label: 'RDP (3389)' },
                    { p: 8080, label: 'Web-Alt (8080)' },
                    { p: 25565, label: 'Minecraft (25565)' }
                  ].map(chip => (
                    <button
                      key={chip.p}
                      onClick={() => { setPortNumber(chip.p.toString()); }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        portNumber === chip.p.toString()
                          ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                          : 'bg-slate-100 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500/40'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Probe Output Status Banner */}
            {probeStatus && (
              <div className={`p-6 rounded-2xl border transition-all space-y-4 ${
                probeStatus === 'open'
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800 dark:text-emerald-300'
                  : probeStatus === 'timeout'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-800 dark:text-amber-300'
                  : probeStatus === 'browser-restricted'
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-800 dark:text-indigo-300'
                  : probeStatus === 'checking'
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-800 dark:text-cyan-300'
                  : 'bg-rose-500/10 border-rose-500/40 text-rose-800 dark:text-rose-300'
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {probeStatus === 'open' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : probeStatus === 'timeout' ? (
                      <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    ) : probeStatus === 'browser-restricted' ? (
                      <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    ) : probeStatus === 'checking' ? (
                      <RefreshCw className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5 animate-spin" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <span className="font-bold block text-sm sm:text-base">
                        {probeStatus === 'open' && `Port ${portNumber} is OPEN & ACCESSIBLE`}
                        {probeStatus === 'timeout' && `Port ${portNumber} TIMEOUT (Filtered / Firewalled)`}
                        {probeStatus === 'closed' && `Port ${portNumber} is CLOSED (Connection Refused)`}
                        {probeStatus === 'unknown-host' && `Target Host Unresolvable`}
                        {probeStatus === 'browser-restricted' && `Browser Sandbox Restriction: Port ${portNumber}`}
                        {probeStatus === 'checking' && `Probing ${portHost}:${portNumber} via Global TCP Nodes...`}
                        {probeStatus === 'error' && `Probe Notice`}
                      </span>
                      <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                        {probeDetails?.message || (probeStatus === 'checking' ? 'Dispatching TCP SYN handshakes across independent edge sensors...' : '')}
                      </p>
                    </div>
                  </div>

                  {probeLatency && (
                    <div className="shrink-0 text-right">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                        Fastest Latency
                      </span>
                      <span className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400">
                        {probeLatency}ms
                      </span>
                    </div>
                  )}
                </div>

                {/* Multi-Node Global Geographical Breakdown */}
                {probeDetails?.nodeResults && probeDetails.nodeResults.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 dark:border-neutral-800/60 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>Geographic Probe Nodes Breakdown:</span>
                      {probeDetails.resolvedIp && (
                        <span>Resolved IP: <strong className="text-slate-900 dark:text-white">{probeDetails.resolvedIp}</strong></span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {probeDetails.nodeResults.map((node, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white/70 dark:bg-neutral-900/80 border border-slate-200/80 dark:border-neutral-800 text-xs font-mono flex items-center justify-between gap-2"
                        >
                          <div className="truncate">
                            <span className="font-semibold block text-slate-800 dark:text-slate-200 truncate">
                              {node.cityName ? `${node.cityName}, ` : ''}{node.countryName}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">
                              {node.countryCode} Node
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            {node.status === 'open' ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                                {node.latency}ms
                              </span>
                            ) : node.status === 'refused' ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400">
                                Refused
                              </span>
                            ) : node.status === 'unknown-host' ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                                DNS Fail
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                                Timeout
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Permanent Link or Terminal Command Helpers */}
                {probeDetails?.permanentLink && (
                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">
                      Independent Sensor Verification:
                    </span>
                    <a
                      href={probeDetails.permanentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                    >
                      <span>View Full Sensor Log</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* External Verification link */}
                {probeDetails?.externalCheckUrl && (
                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-slate-400">
                      Direct Web Check:
                    </span>
                    <a
                      href={probeDetails.externalCheckUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/80 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-semibold transition-all"
                    >
                      <span>Test on PortChecker.co</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Terminal Commands for Localhost or Blocked Ports */}
                {(probeDetails?.powershell || probeDetails?.bash) && (
                  <div className="pt-3 border-t border-slate-200 dark:border-neutral-800/60 space-y-2">
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 block">
                      Direct Command-Line Testing (Local Machine):
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {probeDetails.powershell && (
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs flex items-center justify-between gap-2">
                          <div className="truncate">
                            <span className="text-[10px] text-cyan-400 block font-semibold">PowerShell (Windows):</span>
                            <code className="text-slate-200 truncate block">{probeDetails.powershell}</code>
                          </div>
                          <button
                            onClick={() => copyCommandToClipboard(probeDetails.powershell, 'ps')}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                            title="Copy PowerShell Command"
                          >
                            {copiedCmd === 'ps' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}
                      {probeDetails.bash && (
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs flex items-center justify-between gap-2">
                          <div className="truncate">
                            <span className="text-[10px] text-purple-400 block font-semibold">Bash / Netcat (Linux / Mac):</span>
                            <code className="text-slate-200 truncate block">{probeDetails.bash}</code>
                          </div>
                          <button
                            onClick={() => copyCommandToClipboard(probeDetails.bash, 'bash')}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
                            title="Copy Bash Command"
                          >
                            {copiedCmd === 'bash' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Searchable Port Reference Directory */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Sysadmin Port Directory & Security Best Practices
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Standardized port mappings, default protocols, and perimeter firewall guidelines
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search port, service, protocol..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPorts.map((item) => (
                <div
                  key={item.port}
                  className="p-5 rounded-2xl bg-white/90 dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-3 card-hover-minor shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center font-mono font-black text-xs text-cyan-600 dark:text-cyan-400">
                        {item.port}
                      </span>
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white block">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{item.proto}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      item.risk === 'Critical' 
                        ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-500/30'
                        : item.risk === 'High'
                        ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-500/30'
                        : item.risk === 'Medium'
                        ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30'
                        : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30'
                    }`}>
                      {item.risk} Risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900/90 border border-slate-200/80 dark:border-neutral-800 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold block mb-0.5">Firewall Action:</span>
                    {item.fire}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HASH GENERATOR & VERIFIER */}
      {/* ========================================================================= */}
      {activeTab === 'hash-generator' && (
        <div className="space-y-8 animate-fade-in">
          <div className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-5">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider block">
                  Cryptographic Integrity Suite
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Multi-Algorithm Hash Generator & Checksum Verifier
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHashMode('text')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    hashMode === 'text'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Text String
                </button>
                <button
                  onClick={() => setHashMode('file')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    hashMode === 'file'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Local File
                </button>
              </div>
            </div>

            {/* Input Form */}
            {hashMode === 'text' ? (
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                  Input String / Plaintext Payload:
                </label>
                <textarea
                  rows={3}
                  value={hashInputText}
                  onChange={(e) => setHashInputText(e.target.value)}
                  placeholder="Type or paste text to generate cryptographic hashes..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                  Upload File for Client-Side Checksum (Never uploaded to any server):
                </label>
                <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-neutral-800 text-center space-y-3 bg-slate-50/50 dark:bg-neutral-900/50">
                  <Upload className="w-8 h-8 text-cyan-500 mx-auto" />
                  <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                    <label className="cursor-pointer font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                      <span>Click to select file</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setHashFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                    <span className="block mt-1">
                      {hashFile ? `Selected: ${hashFile.name} (${(hashFile.size / 1024).toFixed(1)} KB)` : 'Supports any file format (ISO, PDF, APK, EXE)'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Casing Toggle */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {isHashing ? 'Computing cryptographic digests...' : 'All digests calculated in real-time via Web Crypto API'}
              </span>
              <button
                onClick={() => setIsUppercase(!isUppercase)}
                className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Format: {isUppercase ? 'UPPERCASE HEX' : 'lowercase hex'}
              </button>
            </div>

            {/* Hashes List */}
            <div className="space-y-3">
              {[
                { name: 'MD5', val: calculatedHashes.MD5, bit: '128-bit', note: 'Legacy checksum' },
                { name: 'SHA-1', val: calculatedHashes['SHA-1'], bit: '160-bit', note: 'Git / Legacy certs' },
                { name: 'SHA-256', val: calculatedHashes['SHA-256'], bit: '256-bit', note: 'Standard for TLS / Blockchain' },
                { name: 'SHA-384', val: calculatedHashes['SHA-384'], bit: '384-bit', note: 'NSA Suite B High Security' },
                { name: 'SHA-512', val: calculatedHashes['SHA-512'], bit: '512-bit', note: 'Maximum collision resistance' }
              ].map((item) => {
                const displayVal = isUppercase ? item.val.toUpperCase() : item.val.toLowerCase();
                return (
                  <div
                    key={item.name}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{item.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-slate-400 font-semibold">
                          {item.bit}
                        </span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          • {item.note}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopyHash(item.val, item.name)}
                        className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer font-bold"
                        title="Copy hash"
                      >
                        {copiedHashKey === item.name ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 font-mono text-xs break-all select-all text-slate-800 dark:text-slate-200">
                      {displayVal || '—'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Checksum Verification Section */}
            <div className="p-6 rounded-2xl bg-slate-100/80 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <span>Verify Against Official Vendor Checksum:</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                Paste the checksum provided by a software publisher (e.g. Cisco ISO, Linux Distro, BIOS update) to verify authenticity and detect file tampering.
              </p>
              <input
                type="text"
                placeholder="Paste expected hash here (e.g. 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8)"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-neutral-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />

              {checksumMatch && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-mono ${
                  checksumMatch.match
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold'
                    : 'bg-rose-500/10 border-rose-500/40 text-rose-700 dark:text-rose-300 font-bold'
                }`}>
                  {checksumMatch.match ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>MATCH VERIFIED! The hash perfectly matches your {checksumMatch.algorithm} digest. File integrity is 100% intact.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <span>MISMATCH DETECTED! The provided checksum does not match any calculated MD5, SHA-1, or SHA-256 digests. File may be corrupted or altered.</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BANDWIDTH & TRANSFER TIME CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'bandwidth' && (
        <div className="space-y-8 animate-fade-in">
          {/* Mode switch */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setBwCalcMode('transfer')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                bwCalcMode === 'transfer'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
              }`}
            >
              Transfer Time Estimator
            </button>
            <button
              onClick={() => setBwCalcMode('converter')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                bwCalcMode === 'converter'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
              }`}
            >
              Network Units Converter
            </button>
            <button
              onClick={() => setBwCalcMode('users')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                bwCalcMode === 'users'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-slate-400'
              }`}
            >
              Campus Users WAN Planner
            </button>
          </div>

          {/* Mode 1: Transfer Time */}
          {bwCalcMode === 'transfer' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Inputs */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider block">
                    Parameters
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Data Payload & Link Speed
                  </h3>
                </div>

                {/* File Size */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                    File / Backup Archive Size:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0.1"
                      step="0.5"
                      value={fileSize}
                      onChange={(e) => setFileSize(Math.max(0.01, parseFloat(e.target.value) || 0))}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                    <select
                      value={fileSizeUnit}
                      onChange={(e) => setFileSizeUnit(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                    >
                      <option value="MB">MB (Megabytes)</option>
                      <option value="GB">GB (Gigabytes)</option>
                      <option value="TB">TB (Terabytes)</option>
                    </select>
                  </div>
                </div>

                {/* Network Speed */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                    Dedicated Link Speed / Bandwidth:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={netSpeed}
                      onChange={(e) => setNetSpeed(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                    <select
                      value={netSpeedUnit}
                      onChange={(e) => setNetSpeedUnit(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                    >
                      <option value="Kbps">Kbps</option>
                      <option value="Mbps">Mbps</option>
                      <option value="Gbps">Gbps</option>
                    </select>
                  </div>
                </div>

                {/* Overhead Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                    <span className="font-semibold">TCP/IP Protocol Overhead:</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">{overheadPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={overheadPct}
                    onChange={(e) => setOverheadPct(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                    (Standard WAN connections experience 8% - 12% packet header and ACK overhead)
                  </span>
                </div>
              </div>

              {/* Output Result Card */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-950 text-white border border-cyan-500/30 shadow-2xl space-y-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                    Calculated Transfer Outcome
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Estimated Time of Completion
                  </h3>
                </div>

                <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center space-y-1">
                  <span className="text-xs font-mono text-cyan-300 block uppercase">
                    Total Transfer Duration
                  </span>
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight block">
                    {transferCalcResult.formatted}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    (~{Math.round(transferCalcResult.seconds).toLocaleString()} total seconds)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">Theoretical Speed:</span>
                    <span className="text-sm font-bold text-cyan-400">{transferCalcResult.byteRateMBs} MB/s</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 block">Real-World Throughput:</span>
                    <span className="text-sm font-bold text-emerald-400">{transferCalcResult.effectiveRateMBs} MB/s</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                  <span className="text-cyan-400 font-bold block mb-1">💡 Sysadmin Insight:</span>
                  1 Byte = 8 bits. ISP connections are sold in bits (Mbps), while files are measured in Bytes (MB). A 100 Mbps link yields maximum real-world throughput of ~11.2 MB/s after TCP windowing and latency.
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Units Converter */}
          {bwCalcMode === 'converter' && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider block">
                  Network Conversion Matrix
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Instant Bit & Byte Throughput Converter
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">Value:</label>
                  <input
                    type="number"
                    min="0"
                    value={convertValue}
                    onChange={(e) => setConvertValue(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">Source Unit:</label>
                  <select
                    value={convertUnit}
                    onChange={(e) => setConvertUnit(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                  >
                    <option value="bps">bps (bits/sec)</option>
                    <option value="Kbps">Kbps (Kilobits/sec)</option>
                    <option value="Mbps">Mbps (Megabits/sec)</option>
                    <option value="Gbps">Gbps (Gigabits/sec)</option>
                    <option value="B/s">B/s (Bytes/sec)</option>
                    <option value="KB/s">KB/s (Kilobytes/sec)</option>
                    <option value="MB/s">MB/s (Megabytes/sec)</option>
                    <option value="GB/s">GB/s (Gigabytes/sec)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {Object.entries(convertedUnits).map(([unit, val]) => (
                  <div key={unit} className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">{unit}</span>
                    <span className="text-base font-bold font-mono text-slate-900 dark:text-white block truncate" title={val}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mode 3: Campus User Planner */}
          {bwCalcMode === 'users' && (
            <div className="p-6 sm:p-10 rounded-3xl bg-white/95 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider block">
                  Capacity Planning
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  Campus / Multi-User ISP Pipe Sizing Calculator
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                    Concurrent Active Users:
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="5000"
                    value={userCount}
                    onChange={(e) => setUserCount(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-sm font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                    Workload Activity Profile:
                  </label>
                  <select
                    value={userProfile}
                    onChange={(e) => setUserProfile(parseFloat(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                  >
                    <option value="2">Light Web & LMS Browsing (2 Mbps/user)</option>
                    <option value="5">Video Streaming & Office 365 (5 Mbps/user)</option>
                    <option value="10">HD Video Calls & Zoom (10 Mbps/user)</option>
                    <option value="25">Heavy Computer Science Lab / Downloads (25 Mbps/user)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">
                    Contention Ratio (Oversubscription):
                  </label>
                  <select
                    value={contentionRatio}
                    onChange={(e) => setContentionRatio(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
                  >
                    <option value="1">1:1 Dedicated (Zero Contention / CIR)</option>
                    <option value="5">1:5 Enterprise Corporate</option>
                    <option value="10">1:10 Standard Campus Academic</option>
                    <option value="20">1:20 High Contention Hostel/Guest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-neutral-800">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block">Peak Demand (If All Active):</span>
                  <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{userBandwidthPlan.peakMbps} Mbps</span>
                </div>
                <div className="p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 space-y-1">
                  <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 block">Committed Base Rate:</span>
                  <span className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-300">{userBandwidthPlan.committedMbps} Mbps</span>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 space-y-1">
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 block">Recommended Leased Line:</span>
                  <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{userBandwidthPlan.recommendedISP} Mbps</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CCTV STORAGE & BANDWIDTH CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'cctv' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider block">
                  Surveillance Architecture
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  IP Camera Matrix Specifications
                </h3>
              </div>

              {/* Number of Cameras */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Number of IP Cameras:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{numCameras} Units</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="128"
                  value={numCameras}
                  onChange={(e) => setNumCameras(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Resolution & Codec */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">Resolution:</label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="720p">720p HD (1.0 MP)</option>
                    <option value="1080p">1080p Full HD (2.0 MP)</option>
                    <option value="4MP">2K Quad HD (4.0 MP)</option>
                    <option value="4K">4K Ultra HD (8.0 MP)</option>
                    <option value="12MP">12 MP Panoramic / Fisheye</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">Video Codec:</label>
                  <select
                    value={codec}
                    onChange={(e) => setCodec(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="H264">H.264 (Standard AVC)</option>
                    <option value="H265">H.265 (HEVC - 50% Savings)</option>
                    <option value="H265+">H.265+ (Smart AI - 65% Savings)</option>
                  </select>
                </div>
              </div>

              {/* Frame Rate & Recording Mode */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">Frame Rate (FPS):</label>
                  <select
                    value={fps}
                    onChange={(e) => setFps(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="10">10 FPS (Static Corridors)</option>
                    <option value="15">15 FPS (Standard Security)</option>
                    <option value="20">20 FPS (Smooth Surveillance)</option>
                    <option value="25">25 FPS (Real-time PAL)</option>
                    <option value="30">30 FPS (Full Real-time NTSC)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-semibold">Daily Active Recording:</label>
                  <select
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  >
                    <option value="24">24/7 Continuous (24 hrs/day)</option>
                    <option value="12">Campus Office Hours (12 hrs/day)</option>
                    <option value="8">Motion Detection Peak (8 hrs/day)</option>
                  </select>
                </div>
              </div>

              {/* Retention Days */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Retention Period:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{retentionDays} Days</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="120"
                  step="1"
                  value={retentionDays}
                  onChange={(e) => setRetentionDays(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>1 Week (7d)</span>
                  <span>1 Month (30d)</span>
                  <span>2 Months (60d)</span>
                  <span>3 Months (90d)</span>
                </div>
              </div>

              {/* Audio Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  Include Microphones / Audio Channels (+64 Kbps):
                </span>
                <input
                  type="checkbox"
                  checked={includeAudio}
                  onChange={(e) => setIncludeAudio(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-950 text-white border border-cyan-500/30 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider block">
                  Storage & NVR Dimensioning
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  Calculated Hard Drive & Bandwidth Requirements
                </h3>
              </div>

              <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center space-y-1">
                <span className="text-xs font-mono text-cyan-300 block uppercase">
                  Total Surveillance Storage Needed
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight block">
                  {cctvResults.totalRawTB} <span className="text-2xl text-cyan-400">TB</span>
                </span>
                <span className="text-xs font-mono text-slate-400 block">
                  ({cctvResults.totalRawGB} GB raw capacity)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Daily Consumption:</span>
                  <span className="text-sm font-bold text-cyan-400">{cctvResults.totalDailyGB} GB / Day</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-slate-400 block">Switch Ingress Bandwidth:</span>
                  <span className="text-sm font-bold text-emerald-400">{cctvResults.totalMatrixBandwidthMbps} Mbps</span>
                </div>
              </div>

              {/* Hardware Recommendation */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-cyan-400 font-bold block uppercase tracking-wider flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4" /> Recommended Hard Drive Array:
                </span>
                <div className="space-y-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Base Capacity Drives (8TB SkyHawk/WD Purple):</span>
                    <span className="font-bold text-white">{cctvResults.neededDataDrives} × 8TB HDDs</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-emerald-400 font-semibold">
                    <span>With RAID 5 Parity Protection:</span>
                    <span>{cctvResults.raid5TotalDrives} × 8TB HDDs</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
                <span className="text-cyan-400 font-bold block mb-1">💡 Campus Infrastructure Experience:</span>
                As practiced in campus network deployments, all CCTV cameras should reside on an isolated VLAN (e.g. VLAN 30) with PoE+ Gigabit managed switch uplinks to prevent camera video broadcast storms from saturating the administrative LAN.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SEO Technical Q&A / Knowledge Accordion */}
      <section className="pt-8 border-t border-slate-200 dark:border-neutral-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Technical Questions (FAQ)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Key concepts in enterprise network engineering, cybersecurity digests, and CCTV dimensioning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-500" />
              What is the difference between H.264 and H.265 compression?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              H.265 (HEVC) utilizes dynamic Macroblock tree sizes (up to 64×64 pixels) compared to H.264's fixed 16×16 blocks. This delivers approximately 50% bandwidth and storage reduction at identical visual quality, allowing campuses to double camera retention periods on the same NVR storage array.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-500" />
              Why are cryptographic hashes non-reversible (one-way)?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Cryptographic hash functions like SHA-256 process data through compression functions and mathematical modular additions that intentionally discard state information. They are designed for collision resistance and pre-image resistance, ensuring a hash cannot be reverse-engineered back to plaintext.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-500" />
              Why is port 445 (SMB) considered critical risk on public WAN?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Port 445 is used for Microsoft Server Message Block (SMB) file sharing. Historical remote code execution vulnerabilities like MS17-010 (EternalBlue used by WannaCry and NotPetya) target exposed port 445. All enterprise boundary firewalls should drop inbound port 445 unconditionally.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-neutral-950/70 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-500" />
              How does TCP windowing affect bandwidth transfer speed?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              TCP uses sliding window flow control to dictate how many bytes can be transmitted before receiving an acknowledgement (ACK). On high-latency WAN links, throughput is bounded by Bandwidth-Delay Product (BDP = Bandwidth × RTT), which is why real-world downloads often require a 10% overhead factor.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

