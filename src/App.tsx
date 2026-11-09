import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  X,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
  Hash,
  RefreshCw,
  Search,
  MoreVertical
} from 'lucide-react';
import {
  Message,
  INITIAL_MESSAGES,
  SUMMARY_DATA,
  DEMO_TOPIC,
  SummaryPoint
} from './types';

export default function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState<number>(DEMO_TOPIC.unreadCount);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [highlightedMsgId, setHighlightedMsgId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom initially
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  const handleOpenSummary = () => {
    setIsSummaryOpen((prev) => !prev);
    setIsGenerating(false);
  };

  const handleJumpToMessage = (targetId: number) => {
    setHighlightedMsgId(targetId);
    const element = document.getElementById(`msg-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Dismiss summary drawer on mobile / narrow screen, or keep open on desktop
    setTimeout(() => {
      setHighlightedMsgId(null);
    }, 2800);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'Muhammad Takdir',
      senderRole: 'Kabid APTIKA',
      avatarColor: '#2F88E0',
      avatarText: 'MT',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1240px',
      height: '92vh',
      margin: '0 auto',
      display: 'flex',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      backgroundColor: '#17212b',
      position: 'relative'
    }}>
      {/* LEFT CHAT LIST (Desktop View / Sidebar) */}
      <div style={{
        width: '320px',
        backgroundColor: '#0e1621',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#2b5278',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '14px',
            color: '#fff'
          }}>
            TS
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '15px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {DEMO_TOPIC.groupName}
            </div>
            <div style={{ fontSize: '12px', color: '#6c7883' }}>
              Forum Supergroup
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', color: '#6c7883', cursor: 'pointer', padding: '6px' }}>
            <Search size={18} />
          </button>
        </div>

        {/* Topics List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          <div style={{
            padding: '12px 14px',
            borderRadius: '10px',
            backgroundColor: '#2b5278',
            cursor: 'pointer',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#60a5fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0e1621',
              flexShrink: 0
            }}>
              <Hash size={20} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '13.5px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {DEMO_TOPIC.name}
                </span>
                <span style={{ fontSize: '11px', color: '#a2abb3' }}>09:22</span>
              </div>
              <p style={{ fontSize: '12px', color: '#a2abb3', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Muhammad Takdir: Sudah diaudit dan bersih dari kredensial...
              </p>
            </div>
            {unreadCount > 0 && (
              <span style={{
                backgroundColor: '#2481cc',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '12px',
                padding: '2px 7px',
                alignSelf: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </div>

          <div style={{
            padding: '12px 14px',
            borderRadius: '10px',
            marginTop: '4px',
            cursor: 'pointer',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            opacity: 0.65
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#3b434d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <Hash size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: '13px', color: '#fff' }}>General / Umum</div>
              <div style={{ fontSize: '11.5px', color: '#6c7883' }}>Hasir Achmad: Terima kasih...</div>
            </div>
          </div>
        </div>

        {/* Concept Badge at sidebar footer */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundColor: '#0a1017',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Sparkles size={14} color="#60a5fa" />
          <span style={{ fontSize: '11.5px', color: '#828e99' }}>
            Telegram <strong>Designers × AI</strong> Submission
          </span>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#0e1621',
        overflow: 'hidden'
      }}>
        {/* Chat Topic Header */}
        <div style={{
          height: '62px',
          padding: '0 20px',
          backgroundColor: '#17212b',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: '#2481cc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Hash size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '15px', color: '#fff' }}>
                {DEMO_TOPIC.name}
              </div>
              <div style={{ fontSize: '12px', color: '#6c7883' }}>
                {DEMO_TOPIC.participantsCount} anggota • Topik Aktif
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Header action button */}
            <button
              onClick={handleOpenSummary}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: isSummaryOpen
                  ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.25), rgba(192, 132, 252, 0.25))'
                  : 'rgba(255, 255, 255, 0.06)',
                border: isSummaryOpen ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.1)',
                color: isSummaryOpen ? '#60a5fa' : '#c4c9cc',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={14} color={isSummaryOpen ? '#60a5fa' : '#c084fc'} />
              <span>{isSummaryOpen ? 'Tutup Ringkasan' : 'AI Summary'}</span>
            </button>
            <button style={{ background: 'none', border: 'none', color: '#6c7883', cursor: 'pointer', padding: '8px' }}>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Message Thread Scroll View */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #111a24 0%, #0e1621 100%)'
          }}
        >
          {/* Day Divider */}
          <div style={{ textAlign: 'center', margin: '8px 0 16px' }}>
            <span style={{
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              color: '#828e99',
              fontSize: '12px',
              padding: '4px 14px',
              borderRadius: '12px',
              fontWeight: 500
            }}>
              Senin, 09 November 2026
            </span>
          </div>

          {messages.map((msg) => {
            const isTarget = highlightedMsgId === msg.id;
            return (
              <div
                id={`msg-${msg.id}`}
                key={msg.id}
                className={isTarget ? 'highlight-flash' : ''}
                style={{
                  display: 'flex',
                  justifyContent: msg.isSelf ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: '8px',
                  transition: 'background-color 0.4s ease',
                  borderRadius: '16px',
                  padding: isTarget ? '4px 8px' : '0'
                }}
              >
                {!msg.isSelf && (
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: msg.avatarColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '12.5px',
                    color: '#fff',
                    flexShrink: 0,
                    marginBottom: '2px'
                  }}>
                    {msg.avatarText}
                  </div>
                )}

                <div style={{
                  maxWidth: '72%',
                  backgroundColor: msg.isSelf ? '#2b5278' : '#182533',
                  borderRadius: msg.isSelf ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding: '9px 14px 7px 14px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
                  position: 'relative'
                }}>
                  {!msg.isSelf && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: msg.avatarColor }}>
                        {msg.sender}
                      </span>
                      {msg.senderRole && (
                        <span style={{ fontSize: '10.5px', color: '#828e99', backgroundColor: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>
                          {msg.senderRole}
                        </span>
                      )}
                    </div>
                  )}

                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.45',
                    color: '#f5f5f5',
                    wordBreak: 'break-word'
                  }}>
                    {msg.text}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px',
                    fontSize: '11px',
                    color: msg.isSelf ? '#89b6db' : '#6c7883'
                  }}>
                    <span>{msg.time}</span>
                    {msg.isSelf && <CheckCheck size={14} color="#89b6db" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* FLOATING ACTION PILL: "✨ Ringkas 38 Pesan" (Contextual Thread Summary Pill) */}
        {!isSummaryOpen && unreadCount > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '84px',
            right: '28px',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px'
          }}>
            {/* The Hero AI Pill */}
            <button
              onClick={handleOpenSummary}
              className="ai-glow-border"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 18px',
                borderRadius: '26px',
                backgroundColor: 'rgba(23, 33, 43, 0.94)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 28px rgba(0, 0, 0, 0.45), 0 0 20px rgba(96, 165, 250, 0.25)',
                cursor: 'pointer',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(192, 132, 252, 0.6)'
              }}>
                <Sparkles size={14} color="#ffffff" />
              </div>
              <span className="ai-gradient-text" style={{ fontWeight: 700, fontSize: '13.5px', letterSpacing: '-0.2px' }}>
                Ringkas Topik Ini
              </span>
              <span style={{
                backgroundColor: '#2481cc',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '10px',
                padding: '2px 7px'
              }}>
                {unreadCount}
              </span>
            </button>

            {/* Jump to Unread button right below */}
            <button
              onClick={() => {
                setUnreadCount(0);
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#17212b',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#6c7883',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)'
              }}
            >
              <ChevronDown size={20} />
            </button>
          </div>
        )}

        {/* INPUT COMPOSER BAR */}
        <div style={{
          padding: '12px 20px',
          backgroundColor: '#17212b',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10
        }}>
          <button style={{ background: 'none', border: 'none', color: '#6c7883', cursor: 'pointer', padding: '4px' }}>
            <Paperclip size={20} />
          </button>

          <form onSubmit={handleSendMessage} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan..."
              style={{
                width: '100%',
                padding: '11px 16px',
                borderRadius: '12px',
                backgroundColor: '#0e1621',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </form>

          <button style={{ background: 'none', border: 'none', color: '#6c7883', cursor: 'pointer', padding: '4px' }}>
            <Smile size={20} />
          </button>

          <button
            onClick={() => handleSendMessage()}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#2481cc',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
          >
            <Send size={16} />
          </button>
        </div>

        {/* AI SUMMARY DRAWER / FLYOUT PANEL (Interaksi Kunci untuk Pavel Durov) */}
        {isSummaryOpen && (
          <div
            className="telegram-glass"
            style={{
              position: 'absolute',
              top: '62px',
              right: 0,
              bottom: '68px',
              width: '430px',
              maxWidth: '100%',
              zIndex: 40,
              backgroundColor: '#17212b',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.75)',
              animation: 'slideInRight 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Header Drawer */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: '#131b24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #60a5fa, #c084fc)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(96, 165, 250, 0.4)'
                }}>
                  <Sparkles size={17} color="#fff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.2px' }}>
                    Contextual AI Summary
                  </h3>
                  <div style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 500 }}>
                    Diproses dari 38 pesan • 3 detik lalu
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsSummaryOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#a2abb3',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body Drawer */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: '#17212b'
            }}>
              {isGenerating ? (
                <div style={{ padding: '40px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <RefreshCw size={24} className="ai-gradient-text" style={{ animation: 'spin 1.2s linear infinite' }} />
                  <p style={{ fontSize: '13px', color: '#828e99' }}>Menganalisis inti thread & keputusan rapat...</p>
                </div>
              ) : (
                <>
                  {/* Overview Card */}
                  <div style={{
                    backgroundColor: '#0e1621',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '14px 16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#828e99', letterSpacing: '0.5px' }}>
                        Inti Percakapan
                      </span>
                      <span style={{ fontSize: '11px', color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                        {SUMMARY_DATA.sentiment}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#ffffff' }}>
                      {SUMMARY_DATA.overview}
                    </p>
                  </div>

                  {/* Action Points / Key Decisions with Direct Jump */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#828e99', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                      Poin Keputusan & Aksi
                    </div>

                    {SUMMARY_DATA.points.map((pt: SummaryPoint, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => handleJumpToMessage(pt.targetMessageId)}
                        style={{
                          backgroundColor: '#0e1621',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '13px 15px',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#202e3d';
                          e.currentTarget.style.borderColor = '#60a5fa';
                          e.currentTarget.style.transform = 'translateX(-3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0e1621';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#60a5fa' }}>
                            {idx + 1}. {pt.topic}
                          </span>
                          <span style={{ fontSize: '11px', color: '#6c7883' }}>
                            {pt.timeEstimate}
                          </span>
                        </div>
                        <p style={{ fontSize: '12.5px', color: '#e5e7eb', lineHeight: '1.45' }}>
                          {pt.actionItem}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                          <span style={{ fontSize: '11px', color: '#828e99' }}>
                            Sumber: <strong style={{ color: '#ffffff' }}>{pt.highlightedSender}</strong>
                          </span>
                          <span style={{
                            fontSize: '11.5px',
                            color: '#60a5fa',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 600,
                            backgroundColor: 'rgba(96, 165, 250, 0.12)',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            Lihat Chat <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer Drawer */}
            <div style={{
              padding: '14px 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: '#131b24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '11px', color: '#828e99' }}>
                Konteks thread diproses aman
              </span>
              <button
                onClick={() => {
                  setUnreadCount(0);
                  setIsSummaryOpen(false);
                }}
                style={{
                  padding: '7px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#2481cc',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Tandai Sudah Dibaca
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
