export type ServiceItem = {
  title: string;
  description: string;
  available: boolean;
  image?: string;
};

export type ProjectItem = {
  title: string;
  category: string;
  device: string;
  description: string;
  solution: string;
  result: string;
  image: string;
  accent: string;
};

export const portfolioData = {
  profile: {
    fullName: "Nguyễn Tuấn Anh",
    displayName: "Nguyễn Tuấn Anh",
    jobTitle: "Kỹ thuật viên điện lạnh",
    introLabel: "KỸ THUẬT VIÊN ĐIỆN LẠNH",
    heroTitle: "Nguyễn Tuấn Anh - ----Kỹ thuật viên điện lạnh tại Hoàng Mai, Hà Nội----",
    experience: "Khoảng 1 năm kinh nghiệm",
    qualification: "Có bằng nghề",
    qualificationDetails:
      "Thông tin chi tiết về bằng nghề sẽ được bổ sung khi chủ website xác nhận.",
    introduction:
      "Cung cấp dịch vụ kỹ thuật điện lạnh cho gia đình và cửa hàng. Tiếp nhận yêu cầu sửa chữa, lắp đặt, bảo dưỡng thiết bị và trao đổi rõ ràng với khách hàng trước khi thực hiện.",
    serviceArea: "Xung quanh khu vực Hoàng Mai, Hà Nội",
    workingHours: "Theo lịch hẹn",
    shortDescription:
      "Hỗ trợ sửa chữa, lắp đặt và bảo dưỡng thiết bị điện lạnh cho gia đình và cửa hàng.",
  },
  certificate: {
    title: "",
    trainingName: "",
    issuingBody: "",
    level: "",
    issuedYear: "",
    trainingContent: [] as string[],
    image: "",
    certificateNumber: "",
    summary: "Thông tin đào tạo và chứng nhận chuyên môn",
  },
  contactMethods: [
    {
      id: "phone",
      label: "Gọi điện",
      icon: "☎",
      value: "",
      enabled: false,
      description: "Mở ứng dụng gọi điện",
      order: 1,
    },
    {
      id: "zalo",
      label: "Zalo",
      icon: "💬",
      value: "",
      enabled: false,
      description: "Nhắn tin qua Zalo",
      order: 2,
    },
    {
      id: "messenger",
      label: "Messenger",
      icon: "💬",
      value: "",
      enabled: false,
      description: "Nhắn tin qua Messenger",
      order: 3,
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: "f",
      value: "",
      enabled: false,
      description: "Xem trang Facebook",
      order: 4,
    },
    {
      id: "sms",
      label: "SMS",
      icon: "✉",
      value: "",
      enabled: false,
      description: "Gửi tin nhắn văn bản",
      order: 5,
    },
    {
      id: "email",
      label: "Email",
      icon: "@",
      value: "",
      enabled: false,
      description: "Gửi email yêu cầu tư vấn",
      order: 6,
    },
    {
      id: "maps",
      label: "Bản đồ",
      icon: "📍",
      value: "",
      enabled: false,
      description: "Xem khu vực phục vụ",
      order: 7,
    },
  ],
  fullName: "Nguyễn Tuấn Anh",
  displayName: "Nguyễn Tuấn Anh",
  jobTitle: "Kỹ thuật viên điện lạnh",
  introLabel: "KỸ THUẬT VIÊN ĐIỆN LẠNH",
  heroTitle: "Nguyễn Tuấn Anh - Kỹ thuật viên điện lạnh tại Hoàng Mai, Hà Nội",
  experience: "Khoảng 1 năm kinh nghiệm",
  qualification: "Có bằng nghề",
  qualificationDetails:
    "Thông tin chi tiết về bằng nghề sẽ được bổ sung khi chủ website xác nhận.",
  qualificationInfo: {
    title: "",
    trainingName: "",
    issuingBody: "",
    level: "",
    issuedYear: "",
    trainingContent: [] as string[],
    certificateImage: "",
    certificateNumber: "",
    summary: "Thông tin đào tạo và chứng nhận chuyên môn",
  },
  introduction:
    "Cung cấp dịch vụ kỹ thuật điện lạnh cho gia đình và cửa hàng. Tiếp nhận yêu cầu sửa chữa, lắp đặt, bảo dưỡng thiết bị và trao đổi rõ ràng với khách hàng trước khi thực hiện.",
  serviceArea: "Xung quanh khu vực Hoàng Mai, Hà Nội",
  phone: "",
  zaloUrl: "",
  messengerUrl: "",
  facebookUrl: "",
  email: "",
  smsMessage:
    "Xin chào, tôi cần hỗ trợ sửa chữa điện lạnh. Tình trạng: ... Khu vực: Hoàng Mai. Mong muốn được tư vấn lịch kiểm tra và chi phí.",
  googleMapsUrl: "",
  workingHours: "Theo lịch hẹn",
  services: [
    {
      title: "Vệ sinh và bảo dưỡng điều hòa",
      description:
        "Vệ sinh dàn lạnh, kiểm tra lưu lượng, loại bỏ mùi và cải thiện hiệu quả làm mát.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Lắp đặt, tháo dỡ và di chuyển điều hòa",
      description:
        "Tư vấn vị trí lắp đặt, kiểm tra nguồn điện và đảm bảo máy vận hành ổn định sau khi lắp.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Kiểm tra và sửa chữa điều hòa",
      description:
        "Khảo sát nguyên nhân, kiểm tra điện áp, máy nén, quạt gió và hệ thống điều khiển.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Kiểm tra và sửa chữa tủ lạnh",
      description:
        "Chẩn đoán lỗi làm lạnh, rò điện, quạt, máy nén và hệ thống thoát nước.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Kiểm tra và sửa chữa máy giặt",
      description:
        "Kiểm tra động cơ, hệ thống cấp nước, bơm, nguồn điện và các lỗi hoạt động thường gặp.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Kiểm tra và sửa chữa bình nóng lạnh",
      description:
        "Kiểm tra hệ thống nước, điện và hoạt động của máy theo nguyên nhân kỹ thuật thực tế.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Điện nước cơ bản và các việc nhỏ khác",
      description:
        "Sửa chữa nhanh các việc nhỏ như ổ cắm, bóng đèn, vòi nước, van, đường ống và các công việc điện nước cơ bản.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Các công việc điện lạnh khác theo năng lực thực tế",
      description:
        "Tiếp nhận yêu cầu theo tình trạng thiết bị và đánh giá phạm vi kỹ thuật phù hợp.",
      available: true,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
    },
  ] as ServiceItem[],
  skills: [
    "Kiểm tra tình trạng thiết bị và xác định nguyên nhân trước khi sửa chữa.",
    "Vệ sinh và bảo dưỡng điều hòa, tủ lạnh và các thiết bị liên quan.",
    "Hỗ trợ các việc điện nước cần xử lý nhanh, gọn và thực tế.",
    "Lắp đặt, tháo dỡ và di chuyển thiết bị trong phạm vi phù hợp.",
    "Sử dụng dụng cụ kỹ thuật cơ bản để chẩn đoán và kiểm tra hoạt động.",
  ],
  certificates: ["Có bằng nghề."],
  projects: [] as ProjectItem[],
  workingProcess: [
    "Tiếp nhận yêu cầu qua Zalo hoặc điện thoại.",
    "Trao đổi tình trạng thiết bị, địa điểm và lịch hẹn.",
    "Kiểm tra thiết bị, xác định nguyên nhân và thông báo chi phí dự kiến.",
    "Tiến hành công việc sau khi khách hàng đồng ý.",
    "Kiểm tra vận hành, bàn giao và trao đổi về bảo hành nếu áp dụng.",
  ],
  whyChoose: [
    "Trao đổi rõ ràng trước khi thực hiện để khách hàng hiểu tình trạng thiết bị.",
    "Báo chi phí trước khi sửa chữa để tránh phát sinh bất ngờ.",
    "Hẹn lịch linh hoạt theo nhu cầu thực tế của gia đình hoặc cửa hàng.",
    "Hướng dẫn sử dụng và bảo dưỡng thiết bị đơn giản, dễ áp dụng.",
  ],
  warrantyPolicy:
    "Có hỗ trợ bảo hành đối với các hạng mục đủ điều kiện theo thỏa thuận khi thực hiện công việc. Thời hạn và điều kiện bảo hành được trao đổi rõ ràng với khách hàng tùy theo hạng mục sửa chữa hoặc lắp đặt.",
  cooperationMessage:
    "Bên cạnh việc nhận công việc trực tiếp từ khách hàng, tôi sẵn sàng trao đổi cơ hội làm việc hoặc cộng tác với cửa hàng, đơn vị cung cấp dịch vụ điện lạnh có nhu cầu.",
  socialLinks: [{ label: "Zalo", href: "" }],
};
