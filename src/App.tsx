import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import GlobalStyle from "./components/styles/GlobalStyle";
import { portfolioData } from "./data/portfolioData";

const navItems = [
  { label: "Giới thiệu", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Kinh nghiệm làm việc", href: "#experience" },
  { label: "Bằng nghề & Chứng chỉ", href: "#certificates" },
  { label: "Quy trình làm việc", href: "#process" },
  { label: "Chính sách bảo hành", href: "#warranty" },
  { label: "Hợp tác công việc", href: "#cooperation" },
  { label: "Liên hệ tư vấn", href: "#contact" },
];

const currentYear = new Date().getFullYear();

const profile = portfolioData.profile;
const certificate = portfolioData.certificate;
const heroTitleParts = (portfolioData.profile.heroTitle || portfolioData.heroTitle || "").split(" - ");
const heroName = heroTitleParts[0] || portfolioData.displayName || profile.fullName;
const heroSubtitle = heroTitleParts.slice(1).join(" - ") || portfolioData.jobTitle || profile.jobTitle;

function App() {
  const { theme, themeLoaded } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const themeColor = theme.colors?.body;
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    const maskIcon = document.querySelector("link[rel='mask-icon']");
    const metaMsTileColor = document.querySelector(
      "meta[name='msapplication-TileColor']"
    );

    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
    metaMsTileColor && metaMsTileColor.setAttribute("content", themeColor);
    maskIcon && maskIcon.setAttribute("color", themeColor);
  }, [theme]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const messageBody = [
    `Xin chào ${portfolioData.displayName},`,
    "tôi cần hỗ trợ sửa chữa thiết bị điện lạnh.",
    "Mong muốn được tư vấn thời gian kiểm tra và chi phí phù hợp.",
    `Khu vực: ${portfolioData.serviceArea || "Hoàng Mai"}.`,
  ].join(" ");

  const openExternalLink = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyMessage = async () => {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(messageBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const qualificationFields = [
    { label: "Tên bằng / chứng chỉ", value: certificate.title },
    { label: "Nghề đào tạo", value: certificate.trainingName },
    { label: "Đơn vị cấp bằng", value: certificate.issuingBody },
    { label: "Trình độ đào tạo", value: certificate.level },
    { label: "Năm cấp", value: certificate.issuedYear },
    { label: "Số hiệu bằng", value: certificate.certificateNumber },
  ].filter(field => field.value && field.value.trim());

  const trainingContent = (certificate.trainingContent || []).filter(
    item => item && item.trim()
  );

  const availableContactMethods: Array<{
    id: string;
    label: string;
    icon: string;
    value: string;
    enabled: boolean;
    description: string;
    order: number;
    href: string;
  }> = (portfolioData.contactMethods || [])
    .filter((method: { enabled: boolean; value: string }) => method.enabled && method.value && method.value.trim())
    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
    .map((method: { id: string; value: string; description: string; label: string; icon: string; enabled: boolean; order: number }) => {
      const value = method.value.trim();

      if (method.id === "phone") {
        return {
          ...method,
          href: `tel:${value}`,
        };
      }

      if (method.id === "sms") {
        return {
          ...method,
          href: `sms:${value}?body=${encodeURIComponent(
            portfolioData.smsMessage || "Xin chào, tôi cần hỗ trợ sửa chữa điện lạnh."
          )}`,
        };
      }

      if (method.id === "email") {
        return {
          ...method,
          href: `mailto:${value}?subject=${encodeURIComponent(
            "Yêu cầu dịch vụ điện lạnh"
          )}&body=${encodeURIComponent(messageBody)}`,
        };
      }

      if (method.id === "maps") {
        return {
          ...method,
          href: value,
        };
      }

      return {
        ...method,
        href: value,
      };
    });

  const contactMethods = [
    portfolioData.zaloUrl && {
      label: "Zalo",
      href: portfolioData.zaloUrl,
      description: "Nhắn tin trực tiếp qua Zalo",
    },
    portfolioData.messengerUrl && {
      label: "Messenger",
      href: portfolioData.messengerUrl,
      description: "Nhắn tin qua Facebook Messenger",
    },
    portfolioData.phone && {
      label: "Gọi điện",
      href: `tel:${portfolioData.phone}`,
      description: "Mở ứng dụng gọi điện trên thiết bị",
    },
    portfolioData.phone && {
      label: "SMS",
      href: `sms:${portfolioData.phone}?body=${encodeURIComponent(
        portfolioData.smsMessage || "Xin chào, tôi cần hỗ trợ sửa chữa điện lạnh."
      )}`,
      description: "Gửi tin nhắn văn bản nhanh",
    },
    portfolioData.email && {
      label: "Email",
      href: `mailto:${portfolioData.email}?subject=${encodeURIComponent(
        "Yêu cầu hỗ trợ kỹ thuật điện lạnh"
      )}&body=${encodeURIComponent(messageBody)}`,
      description: "Trao đổi công việc và hợp tác",
    },
    portfolioData.googleMapsUrl && {
      label: "Bản đồ",
      href: portfolioData.googleMapsUrl,
      description: "Xem khu vực phục vụ và địa điểm hẹn",
    },
  ].filter(Boolean) as { label: string; href: string; description: string }[];

  const visibleContactMethods =
    availableContactMethods.length > 0 ? availableContactMethods : contactMethods;

  return (
    <>
      <h1 className="sr-only" aria-label="Portfolio kỹ thuật viên điện lạnh">
        Portfolio kỹ thuật viên điện lạnh
      </h1>
      {themeLoaded && (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Page>
              <Header>
                <HeaderContainer>
                  <Logo href="#top" aria-label="Về đầu trang">
                    <LogoMark>KL</LogoMark>
                    <LogoText>
                      <span>{portfolioData.displayName}</span>
                      <small>{portfolioData.jobTitle}</small>
                    </LogoText>
                  </Logo>

                  <Nav aria-label="Điều hướng chính" open={mobileMenuOpen}>
                    {navItems.map(item => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </Nav>

                  <HeaderActions>
                    {portfolioData.phone && (
                      <PhoneButton href={`tel:${portfolioData.phone}`}>
                        Gọi ngay
                      </PhoneButton>
                    )}
                    {portfolioData.zaloUrl && (
                      <SecondaryButton
                        href={portfolioData.zaloUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Liên hệ Zalo
                      </SecondaryButton>
                    )}
                    <MenuButton
                      type="button"
                      aria-label="Mở menu"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? "✕" : "☰"}
                    </MenuButton>
                  </HeaderActions>
                </HeaderContainer>
              </Header>

              <Main id="top">
                <HeroSection>
                  <Container>
                    <HeroGrid>
                      <HeroContent>
                        <HeroTitle>
                          <HeroName>{heroName}</HeroName>
                          <HeroRole>{heroSubtitle}</HeroRole>
                        </HeroTitle>
                        <HeroDescription>{portfolioData.introduction}</HeroDescription>

                        <HeroMeta>
                          <MetaItem>
                            <MetaLabel>Kinh nghiệm</MetaLabel>
                            <MetaValue>{portfolioData.experience}</MetaValue>
                          </MetaItem>
                          <MetaItem>
                            <MetaLabel>Bằng nghề</MetaLabel>
                            <MetaValue>{portfolioData.qualification}</MetaValue>
                          </MetaItem>
                          <MetaItem>
                            <MetaLabel>Nhận việc</MetaLabel>
                            <MetaValue>{portfolioData.serviceArea}</MetaValue>
                          </MetaItem>
                        </HeroMeta>

                        <HeroActions>
                          {portfolioData.zaloUrl ? (
                            <PrimaryButton href={portfolioData.zaloUrl} target="_blank" rel="noreferrer">
                              Nhắn Zalo tư vấn
                            </PrimaryButton>
                          ) : null}
                          {portfolioData.messengerUrl ? (
                            <SecondaryButton href={portfolioData.messengerUrl} target="_blank" rel="noreferrer">
                              Messenger
                            </SecondaryButton>
                          ) : null}
                          <SecondaryButton href="#services">
                            Xem dịch vụ
                          </SecondaryButton>
                          {portfolioData.phone ? (
                            <SecondaryButton href={`tel:${portfolioData.phone}`}>
                              Gọi điện
                            </SecondaryButton>
                          ) : null}
                        </HeroActions>
                      </HeroContent>

                      <HeroVisual>
                        <HeroImageCard>
                          <HeroImage
                            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80"
                            alt="Các thiết bị điện lạnh thông dụng như điều hòa, tủ lạnh, máy giặt"
                          />
                          <FloatingBadge>
                            <span>Hỗ trợ</span>
                            <strong>Điều hòa & gia dụng</strong>
                          </FloatingBadge>
                        </HeroImageCard>
                      </HeroVisual>
                    </HeroGrid>
                  </Container>
                </HeroSection>

                <Section id="services">
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Dịch vụ</Eyebrow>
                      <h2>Dịch vụ hỗ trợ điện lạnh</h2>
                    </SectionHeading>

                    <ServicesGrid>
                      {portfolioData.services.map(service => (
                        <ServiceCard key={service.title}>
                          <ServiceIcon aria-hidden="true">
                            {service.available ? "✓" : "•"}
                          </ServiceIcon>
                          <ServiceTitle>{service.title}</ServiceTitle>
                          <ServiceDescription>{service.description}</ServiceDescription>
                          <ServiceAction>
                            {service.available ? "Có thể hỗ trợ" : "Theo nhu cầu thực tế"}
                          </ServiceAction>
                        </ServiceCard>
                      ))}
                    </ServicesGrid>
                  </Container>
                </Section>

                <Section id="about" $soft>
                  <Container>
                    <AboutGrid>
                      <AboutInfo>
                        <SectionHeading alignLeft>
                          <Eyebrow>Giới thiệu</Eyebrow>
                          <h2>Giới thiệu về tôi</h2>
                        </SectionHeading>

                        <Paragraph>
                          Tôi là kỹ thuật viên điện lạnh với khoảng 1 năm kinh nghiệm,
                          tập trung vào việc sửa chữa, lắp đặt và bảo dưỡng các thiết bị
                          điện lạnh theo nhu cầu thực tế của gia đình, cửa hàng và khách
                          hàng cá nhân.
                        </Paragraph>

                        <Paragraph>
                          Công việc được thực hiện theo quy trình rõ ràng: lắng nghe tình
                          trạng thiết bị, kiểm tra nguyên nhân, trao đổi chi phí dự kiến và
                          tiến hành công việc sau khi khách hàng đồng ý. Mục tiêu là mang lại
                          sự an toàn, hiệu quả và dễ hiểu trong từng bước làm việc.
                        </Paragraph>
                      </AboutInfo>

                      <SkillCard>
                        <SkillTitle>Năng lực thực tế</SkillTitle>
                        <SkillList>
                          {portfolioData.skills.map(skill => (
                            <SkillItem key={skill}>{skill}</SkillItem>
                          ))}
                        </SkillList>
                        <MiniList>
                          {portfolioData.certificates.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </MiniList>
                      </SkillCard>
                    </AboutGrid>
                  </Container>
                </Section>

                <Section id="certificates">
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Bằng nghề</Eyebrow>
                      <h2>Bằng nghề &amp; Chứng chỉ</h2>
                    </SectionHeading>

                    <CertificateGrid>
                      <CertificateCard>
                        <CertificateHeader>
                          <CertificateIcon aria-hidden="true">🏅</CertificateIcon>
                          <div>
                            <CertificateLabel>Bằng nghề &amp; Chứng chỉ</CertificateLabel>
                            <CertificateTitle>
                              {certificate.title || "Thông tin sẽ được cập nhật"}
                            </CertificateTitle>
                          </div>
                        </CertificateHeader>

                        <CertificateSummary>
                          {certificate.summary || "Thông tin đào tạo và chứng nhận chuyên môn"}
                        </CertificateSummary>

                        {qualificationFields.length > 0 ? (
                          <QualificationList>
                            {qualificationFields.map(field => (
                              <QualificationItem key={field.label}>
                                <QualificationKey>{field.label}:</QualificationKey>
                                <QualificationValue>{field.value}</QualificationValue>
                              </QualificationItem>
                            ))}
                          </QualificationList>
                        ) : (
                          <QualificationList>
                            <QualificationItem>
                              <QualificationKey>Trạng thái:</QualificationKey>
                              <QualificationValue>
                                Đang cập nhật thông tin bằng nghề và chứng chỉ chính thức.
                              </QualificationValue>
                            </QualificationItem>
                          </QualificationList>
                        )}

                        {trainingContent.length > 0 ? (
                          <TrainingSection>
                            <TrainingTitle>Nội dung đào tạo</TrainingTitle>
                            <TrainingList>
                              {trainingContent.map(item => (
                                <li key={item}>{item}</li>
                              ))}
                            </TrainingList>
                          </TrainingSection>
                        ) : null}
                      </CertificateCard>

                      <CertificateCard>
                        <CertificateLabel>Phạm vi kỹ thuật</CertificateLabel>
                        <CertificateTitle>Điều hòa · Tủ lạnh · Máy giặt · Bình nóng lạnh</CertificateTitle>
                        <CertificateText>
                          Phạm vi công việc được điều chỉnh theo năng lực thực tế và tình
                          trạng thiết bị khi tiếp nhận yêu cầu.
                        </CertificateText>
                        {certificate.image ? (
                          <CertificateImage
                            src={certificate.image}
                            alt="Chứng chỉ nghề nghiệp"
                          />
                        ) : (
                          <CertificatePlaceholder aria-label="Biểu tượng bằng nghề">
                            🏆
                          </CertificatePlaceholder>
                        )}
                      </CertificateCard>
                    </CertificateGrid>
                  </Container>
                </Section>

                <Section id="experience">
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Kinh nghiệm</Eyebrow>
                      <h2>Kinh nghiệm làm việc</h2>
                    </SectionHeading>

                    <ExperienceGrid>
                      <ExperienceCard>
                        <ExperienceNumber>01</ExperienceNumber>
                        <ExperienceText>
                          Kiểm tra tình trạng thiết bị, nghe khách hàng mô tả triệu chứng và
                          xác định mức độ sửa chữa phù hợp.
                        </ExperienceText>
                      </ExperienceCard>
                      <ExperienceCard>
                        <ExperienceNumber>02</ExperienceNumber>
                        <ExperienceText>
                          Chẩn đoán nguyên nhân bằng các bước kiểm tra đơn giản, an toàn và
                          dễ hiểu cho người sử dụng.
                        </ExperienceText>
                      </ExperienceCard>
                      <ExperienceCard>
                        <ExperienceNumber>03</ExperienceNumber>
                        <ExperienceText>
                          Bảo dưỡng và sửa chữa theo đúng quy trình để nâng cao hiệu suất và
                          kéo dài tuổi thọ thiết bị.
                        </ExperienceText>
                      </ExperienceCard>
                    </ExperienceGrid>
                  </Container>
                </Section>

                <Section id="projects" $soft>
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Công trình</Eyebrow>
                      <h2>Hình ảnh công việc thực tế</h2>
                    </SectionHeading>

                    {portfolioData.projects.length > 0 ? (
                      <ProjectsGrid>
                        {portfolioData.projects.map((project, index) => (
                          <ProjectCard key={project.title}>
                            <ProjectImageWrap>
                              <ProjectImage
                                src={project.image}
                                alt={project.title}
                                onClick={() => setLightboxIndex(index)}
                              />
                            </ProjectImageWrap>
                            <ProjectContent>
                              <ProjectBadge>{project.category}</ProjectBadge>
                              <ProjectTitle>{project.title}</ProjectTitle>
                              <ProjectMeta>{project.device}</ProjectMeta>
                              <ProjectText>
                                <strong>Tình trạng ban đầu:</strong> {project.description}
                              </ProjectText>
                              <ProjectText>
                                <strong>Phương án:</strong> {project.solution}
                              </ProjectText>
                              <ProjectText>
                                <strong>Kết quả:</strong> {project.result}
                              </ProjectText>
                            </ProjectContent>
                          </ProjectCard>
                        ))}
                      </ProjectsGrid>
                    ) : (
                      <EmptyState>
                        Hiện tại chưa có hình ảnh công việc thực tế được cung cấp. Mục này
                        sẽ được cập nhật khi chủ website bổ sung ảnh công việc mới.
                      </EmptyState>
                    )}
                  </Container>
                </Section>

                <Section id="process">
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Quy trình</Eyebrow>
                      <h2>Quy trình làm việc</h2>
                    </SectionHeading>

                    <ProcessTimeline>
                      {portfolioData.workingProcess.map((step, index) => (
                        <ProcessStep key={step}>
                          <StepNumber>{index + 1}</StepNumber>
                          <StepText>{step}</StepText>
                        </ProcessStep>
                      ))}
                    </ProcessTimeline>
                  </Container>
                </Section>

                <Section id="why" $soft>
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Vì sao chọn tôi</Eyebrow>
                      <h2>Vì sao chọn tôi làm đối tác</h2>
                    </SectionHeading>

                    <WhyGrid>
                      {portfolioData.whyChoose.map((item, index) => (
                        <ReasonCard key={item}>
                          <ReasonNumber>{index + 1}</ReasonNumber>
                          <ReasonText>{item}</ReasonText>
                        </ReasonCard>
                      ))}
                    </WhyGrid>
                  </Container>
                </Section>

                <Section id="warranty">
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Bảo hành</Eyebrow>
                      <h2>Chính sách bảo hành</h2>
                    </SectionHeading>

                    <WarrantyCard>
                      {portfolioData.warrantyPolicy}
                    </WarrantyCard>
                  </Container>
                </Section>

                <Section id="cooperation" $soft>
                  <Container>
                    <SectionHeading>
                      <Eyebrow>Hợp tác</Eyebrow>
                      <h2>Hợp tác công việc &amp; kinh doanh</h2>
                    </SectionHeading>

                    <CooperationCard>
                      {portfolioData.cooperationMessage}
                    </CooperationCard>
                  </Container>
                </Section>

                <ContactSection id="contact">
                  <Container>
                    <ContactGrid>
                      <ContactCard>
                        <Eyebrow>Liên hệ</Eyebrow>
                        <ContactTitle>{portfolioData.displayName}</ContactTitle>
                        <ContactList>
                          {portfolioData.phone ? (
                            <li>
                              <strong>Điện thoại:</strong> {portfolioData.phone}
                            </li>
                          ) : null}
                          {portfolioData.email ? (
                            <li>
                              <strong>Email:</strong> {portfolioData.email}
                            </li>
                          ) : null}
                          <li>
                            <strong>Khu vực:</strong> {portfolioData.serviceArea}
                          </li>
                          <li>
                            <strong>Giờ làm việc:</strong> {portfolioData.workingHours}
                          </li>
                        </ContactList>
                        <ActionRow>
                          {portfolioData.phone ? (
                            <PrimaryButton href={`tel:${portfolioData.phone}`}>
                              Gọi ngay
                            </PrimaryButton>
                          ) : null}
                          {portfolioData.zaloUrl ? (
                            <SecondaryButton href={portfolioData.zaloUrl} target="_blank" rel="noreferrer">
                              Mở Zalo
                            </SecondaryButton>
                          ) : null}
                          {portfolioData.messengerUrl ? (
                            <SecondaryButton href={portfolioData.messengerUrl} target="_blank" rel="noreferrer">
                              Messenger
                            </SecondaryButton>
                          ) : null}
                        </ActionRow>

                        {visibleContactMethods.length > 0 && (
                          <ContactMethodsGrid>
                            {visibleContactMethods.map(method => (
                              <ContactMethodCard key={method.label}>
                                <ContactMethodLabel>{method.label}</ContactMethodLabel>
                                <ContactMethodText>{method.description}</ContactMethodText>
                                <ContactMethodLink href={method.href} target="_blank" rel="noreferrer">
                                  {method.label === "Gọi điện" || method.label === "SMS" ? "Mở" : "Kết nối"}
                                </ContactMethodLink>
                              </ContactMethodCard>
                            ))}
                          </ContactMethodsGrid>
                        )}
                      </ContactCard>

                      <FormCard>
                        <FormHeading>Liên hệ nhanh</FormHeading>
                        <FormHelper>
                          Khách hàng có thể chọn kênh liên hệ phù hợp để gửi yêu cầu trực tiếp.
                        </FormHelper>
                        <ActionRow>
                          {portfolioData.phone ? (
                            <PrimaryButton href={`tel:${portfolioData.phone}`}>
                              Gọi ngay
                            </PrimaryButton>
                          ) : null}
                          {portfolioData.zaloUrl ? (
                            <SecondaryButton href={portfolioData.zaloUrl} target="_blank" rel="noreferrer">
                              Nhắn Zalo
                            </SecondaryButton>
                          ) : null}
                          {portfolioData.messengerUrl ? (
                            <SecondaryButton href={portfolioData.messengerUrl} target="_blank" rel="noreferrer">
                              Messenger
                            </SecondaryButton>
                          ) : null}
                        </ActionRow>
                        <ActionRow>
                          {portfolioData.email ? (
                            <SecondaryButton href={`mailto:${portfolioData.email}?subject=${encodeURIComponent("Yêu cầu tư vấn điện lạnh")}&body=${encodeURIComponent(messageBody)}`} target="_blank" rel="noreferrer">
                              Email
                            </SecondaryButton>
                          ) : null}
                          <SecondaryButton as="button" type="button" onClick={copyMessage}>
                            {copied ? "Đã sao chép" : "Sao chép tin nhắn"}
                          </SecondaryButton>
                        </ActionRow>
                      </FormCard>
                    </ContactGrid>
                  </Container>
                </ContactSection>
              </Main>

              <Footer>
                <Container>
                  <FooterGrid>
                    <div>
                      <FooterTitle>{portfolioData.displayName}</FooterTitle>
                      <FooterText>{portfolioData.heroTitle}</FooterText>
                    </div>
                    <FooterLinks>
                      {navItems.map(item => (
                        <a key={item.href} href={item.href}>
                          {item.label}
                        </a>
                      ))}
                    </FooterLinks>
                    <div>
                      <FooterText>{portfolioData.serviceArea}</FooterText>
                      {portfolioData.phone ? <FooterText>{portfolioData.phone}</FooterText> : null}
                      {portfolioData.zaloUrl ? <FooterText>Zalo: {portfolioData.zaloUrl}</FooterText> : null}
                    </div>
                  </FooterGrid>
                  <FooterBottom>
                    © {currentYear} {portfolioData.displayName}. Mọi quyền được bảo lưu.
                  </FooterBottom>
                </Container>
              </Footer>

              <MobileFloatBar>
                {portfolioData.phone ? (
                  <PhoneButton href={`tel:${portfolioData.phone}`}>Gọi</PhoneButton>
                ) : null}
                {portfolioData.zaloUrl ? (
                  <SecondaryButton href={portfolioData.zaloUrl} target="_blank" rel="noreferrer">
                    Zalo
                  </SecondaryButton>
                ) : null}
                {portfolioData.messengerUrl ? (
                  <SecondaryButton href={portfolioData.messengerUrl} target="_blank" rel="noreferrer">
                    Messenger
                  </SecondaryButton>
                ) : null}
              </MobileFloatBar>

              {lightboxIndex !== null && (
                <LightboxOverlay onClick={() => setLightboxIndex(null)}>
                  <LightboxContent onClick={event => event.stopPropagation()}>
                    <LightboxImage
                      src={portfolioData.projects[lightboxIndex].image}
                      alt={portfolioData.projects[lightboxIndex].title}
                    />
                    <LightboxCaption>
                      <strong>{portfolioData.projects[lightboxIndex].title}</strong>
                      <span>{portfolioData.projects[lightboxIndex].category}</span>
                    </LightboxCaption>
                  </LightboxContent>
                </LightboxOverlay>
              )}
          </Page>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;

const Page = styled.div`
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  color: ${({ theme }) => theme.colors?.text[100]};
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
`;

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  gap: 1rem;
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
`;

const LogoMark = styled.span`
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  color: #0f172a;
  background: linear-gradient(135deg, #7dd3fc, #0ea5e9);
`;

const LogoText = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  font-weight: 700;

  small {
    font-size: 0.6rem;
    opacity: 0.7;
    font-weight: 500;
  }
`;

const Nav = styled.nav<{ open: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.9rem;

  @media (max-width: 780px) {
    position: absolute;
    left: 1rem;
    right: 1rem;
    top: 72px;
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: rgba(255, 255, 255, 0.98);
    border-radius: 1rem;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors?.text[200]};
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors?.primary};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const buttonStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.9rem;
  padding: 0.8rem 1.3rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-1px);
  }
`;

const PrimaryButton = styled.a`
  ${buttonStyles}
  background: linear-gradient(135deg, #fb923c, #f97316);
  color: #fff;
  box-shadow: 0 16px 32px rgba(249, 115, 22, 0.2);
`;

const SecondaryButton = styled.a`
  ${buttonStyles}
  background: rgba(14, 165, 233, 0.14);
  color: ${({ theme }) => theme.colors?.text[100]};
  border: 1px solid rgba(125, 211, 252, 0.35);
`;

const PhoneButton = styled.a`
  ${buttonStyles}
  color: #fff;
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
`;

const MenuButton = styled.button`
  display: none;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: transparent;
  color: ${({ theme }) => theme.colors?.text[100]};
  border-radius: 0.75rem;
  cursor: pointer;

  @media (max-width: 780px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const Main = styled.main``;

const HeroSection = styled.section`
  padding: 5rem 0 3rem;
  background: linear-gradient(180deg, rgba(14, 165, 233, 0.04), rgba(255,255,255,0));
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const Eyebrow = styled.span<{ alignLeft?: boolean }>`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.2);
  color: ${({ theme }) => theme.colors?.primary};
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  text-transform: uppercase;
  ${({ alignLeft }) => (alignLeft ? "margin-left: 0;" : "margin-inline: auto;")}
`;

const HeroTitle = styled.h2`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0;
  max-width: 660px;
`;

const HeroName = styled.span`
  display: block;
  font-size: clamp(2.5rem, 5vw, 4.1rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 800;
`;

const HeroRole = styled.span`
  display: block;
  font-size: clamp(1.08rem, 2vw, 1.5rem);
  line-height: 1.4;
  color: ${({ theme }) => theme.colors?.text[200]};
  font-weight: 600;
`;

const HeroDescription = styled.p`
  max-width: 620px;
  color: ${({ theme }) => theme.colors?.text[200]};
  font-size: 1.08rem;
  line-height: 1.8;
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const MetaItem = styled.div`
  flex: 1 1 220px;
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.18);
`;

const MetaLabel = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors?.text[300]};
  font-size: 0.7rem;
  margin-bottom: 0.38rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const MetaValue = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors?.text[100]};
  font-weight: 600;
  line-height: 1.5;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeroVisual = styled.div`
  display: flex;
  justify-content: center;
`;

const HeroImageCard = styled.div`
  position: relative;
  width: min(100%, 520px);
  border-radius: 1.4rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
`;

const HeroImage = styled.img`
  width: 100%;
  min-height: 520px;
  object-fit: cover;
  display: block;
`;

const FloatingBadge = styled.div`
  position: absolute;
  left: 1.25rem;
  bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(125, 211, 252, 0.32);
  padding: 0.9rem 1rem;
  border-radius: 1rem;
  color: #fff;

  span {
    font-size: 0.72rem;
    text-transform: uppercase;
    opacity: 0.75;
    letter-spacing: 0.06em;
  }

  strong {
    font-size: 1.05rem;
  }
`;

const Section = styled.section<{ $soft?: boolean }>`
  padding: 5.5rem 0;
  background: ${({ $soft }) => ($soft ? "rgba(15, 23, 42, 0.02)" : "transparent")};
`;

const SectionHeading = styled.div<{ alignLeft?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: ${({ alignLeft }) => (alignLeft ? "left" : "center")};
  margin-bottom: 2rem;

  h2 {
    font-size: clamp(1.8rem, 2.5vw, 2.5rem);
    letter-spacing: -0.04em;
    line-height: 1.2;
    margin: 0;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.35rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.4rem;
  border-radius: 1.1rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
  min-height: 230px;
`;

const ServiceIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 0.9rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
`;

const ServiceTitle = styled.h3`
  font-size: 1.2rem;
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;
`;

const ServiceAction = styled.span`
  margin-top: auto;
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 600;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Paragraph = styled.p`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors?.text[200]};
`;

const SkillCard = styled.div`
  padding: 1.4rem;
  border-radius: 1.2rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
`;

const SkillTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const SkillList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.8rem;
`;

const SkillItem = styled.li`
  position: relative;
  padding-left: 1.4rem;
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7rem;
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors?.primary};
  }
`;

const MiniList = styled.ul`
  margin: 1.2rem 0 0;
  padding-left: 1.2rem;
  color: ${({ theme }) => theme.colors?.text[300]};
  line-height: 1.8;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ExperienceCard = styled.article`
  padding: 1.4rem;
  border-radius: 1.1rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
`;

const ExperienceNumber = styled.span`
  display: inline-flex;
  margin-bottom: 1.1rem;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.75rem;
  align-items: center;
  justify-content: center;
  background: rgba(14, 165, 233, 0.14);
  color: ${({ theme }) => theme.colors?.primary};
  font-weight: 700;
`;

const ExperienceText = styled.p`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors?.text[200]};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CertificateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CertificateCard = styled.article`
  padding: 1.35rem;
  border-radius: 1.1rem;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.18);
`;

const CertificateHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CertificateIcon = styled.div`
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.2);
  font-size: 1.5rem;
`;

const CertificateLabel = styled.span`
  display: inline-block;
  margin-bottom: 0.6rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors?.primary};
`;

const CertificateTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CertificateSummary = styled.p`
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;
`;

const QualificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: grid;
  gap: 0.7rem;
`;

const QualificationItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors?.text[200]};
`;

const QualificationKey = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.text[100]};
`;

const QualificationValue = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
`;

const TrainingSection = styled.div`
  margin-top: 1rem;
`;

const TrainingTitle = styled.h4`
  margin: 0 0 0.7rem;
  font-size: 1rem;
`;

const TrainingList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.8;
`;

const CertificateText = styled.p`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;
`;

const CertificateImage = styled.img`
  display: block;
  width: 100%;
  margin-top: 1rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  object-fit: cover;
  max-height: 220px;
`;

const CertificatePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 160px;
  margin-top: 1rem;
  border-radius: 0.9rem;
  border: 1px dashed rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.04);
  font-size: 3rem;
`;

const EmptyState = styled.div`
  padding: 1.5rem;
  border-radius: 1.1rem;
  background: rgba(15, 23, 42, 0.36);
  border: 1px dashed rgba(148, 163, 184, 0.35);
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;
`;

const WarrantyCard = styled.div`
  padding: 1.35rem;
  border-radius: 1.1rem;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.8;
`;

const CooperationCard = styled.div`
  padding: 1.35rem;
  border-radius: 1.1rem;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.18);
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.8;
`;

const ProjectCard = styled.article`
  overflow: hidden;
  border-radius: 1.1rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
`;

const ProjectImageWrap = styled.div`
  position: relative;
  cursor: pointer;
`;

const ProjectImage = styled.img`
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.3rem;
`;

const ProjectBadge = styled.span`
  width: fit-content;
  border-radius: 999px;
  padding: 0.4rem 0.7rem;
  background: rgba(14, 165, 233, 0.12);
  border: 1px solid rgba(14, 165, 233, 0.2);
  color: ${({ theme }) => theme.colors?.primary};
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
`;

const ProjectMeta = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const ProjectText = styled.p`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.colors?.text[100]};
  }
`;

const ProcessTimeline = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.5rem 1rem 1rem;
  border-radius: 1.25rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  color: #fff;
  font-weight: 700;
`;

const StepText = styled.p`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;
`;

const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const ReasonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.4rem;
  min-height: 200px;
  border-radius: 1.2rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
`;

const ReasonNumber = styled.span`
  display: inline-flex;
  width: 2.2rem;
  height: 2.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(249, 115, 22, 0.12);
  color: #f97316;
  font-weight: 700;
`;

const ReasonText = styled.p`
  line-height: 1.7;
  color: ${({ theme }) => theme.colors?.text[200]};
`;

const ContactSection = styled.section`
  padding: 5rem 0 6rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ContactCard = styled.div`
  padding: 1.5rem;
  border-radius: 1.2rem;
  background: linear-gradient(180deg, rgba(14, 165, 233, 0.05), #ffffff);
  border: 1px solid rgba(148, 163, 184, 0.18);
`;

const ContactTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1.2rem;
  font-size: 1.8rem;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;
`;

const ContactMethodsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const ContactMethodCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.9rem;
  border-radius: 0.9rem;
  background: #f8fbff;
  border: 1px solid rgba(148, 163, 184, 0.18);
`;

const ContactMethodLabel = styled.span`
  font-weight: 700;
`;

const ContactMethodText = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.5;
  font-size: 0.85rem;
`;

const ContactMethodLink = styled.a`
  width: fit-content;
  color: ${({ theme }) => theme.colors?.primary};
  text-decoration: none;
  font-weight: 600;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const FormCard = styled.div`
  padding: 1.5rem;
  border-radius: 1.2rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.04);
`;

const FormHeading = styled.h3`
  margin-bottom: 0.75rem;
`;

const FormHelper = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.6;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors?.text[200]};
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.45);
  color: ${({ theme }) => theme.colors?.text[100]};
  border-radius: 0.9rem;
  padding: 0.85rem 1rem;
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors?.text[300]};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.45);
  color: ${({ theme }) => theme.colors?.text[100]};
  border-radius: 0.9rem;
  padding: 0.85rem 1rem;
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors?.text[300]};
  }
`;

const FormError = styled.p`
  color: #fca5a5;
  line-height: 1.5;
`;

const FormButton = styled.button`
  border: 0;
  border-radius: 0.9rem;
  padding: 0.9rem 1.4rem;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
`;

const Footer = styled.footer`
  padding: 2rem 0 4rem;
  border-top: 1px solid rgba(148, 163, 184, 0.18);
  background: #f8fbff;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 0.9fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.7;
`;

const FooterLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem 1.1rem;

  a {
    color: ${({ theme }) => theme.colors?.text[200]};
    text-decoration: none;
  }
`;

const FooterBottom = styled.div`
  padding-top: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.12);
  color: ${({ theme }) => theme.colors?.text[300]};
  text-align: center;
`;

const MobileFloatBar = styled.div`
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: none;
  gap: 0.7rem;
  padding: 0.8rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.18);
  backdrop-filter: blur(12px);
  box-shadow: 0 16px 44px rgba(15, 23, 42, 0.12);

  @media (max-width: 780px) {
    display: flex;
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.8);
  display: grid;
  place-items: center;
  z-index: 30;
  padding: 1rem;
`;

const LightboxContent = styled.div`
  max-width: 820px;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 1.25rem;
  overflow: hidden;
`;

const LightboxImage = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
  display: block;
`;

const LightboxCaption = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.2rem;
  color: ${({ theme }) => theme.colors?.text[200]};

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;
