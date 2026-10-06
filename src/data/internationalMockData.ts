import { 
  InternationalMajor, 
  InternationalScholarship, 
  InternationalFeeStructure, 
  InternationalDocumentItem, 
  InternationalApplicant 
} from '../types/international';

// 54 Undergraduate Majors (Trích xuất nguyên văn từ Bảng Ảnh 1 & Ảnh 4 của Trường ĐH Vinh)
export const internationalUndergraduateMajors: InternationalMajor[] = [
  { no: 1, code: '7140205', nameVi: 'Giáo dục Chính trị', nameEn: 'Politics Education', nameLao: 'ການສຶກສາທາງດ້ານການເມືອງ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 2, code: '7140201', nameVi: 'Giáo dục Mầm non', nameEn: 'Preschool Education', nameLao: 'ອະນຸບານ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 3, code: '7140208', nameVi: 'Giáo dục Quốc phòng - An ninh', nameEn: 'National defence – Security Education', nameLao: 'ຄູການທະຫານ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 4, code: '7140206', nameVi: 'Giáo dục Thể chất', nameEn: 'Physical Education', nameLao: 'ການສຶກສາທາງດ້ານຮ່າງກາຍ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 5, code: '7140202', nameVi: 'Giáo dục Tiểu học', nameEn: 'Primary Education', nameLao: 'ຄູປະຖົມສຶກສາ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 6, code: '7140114', nameVi: 'Quản lý Giáo dục', nameEn: 'Education Management', nameLao: 'ຄຸ້ມຄອງການສຶກສາ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Khoa học Giáo dục' },
  { no: 7, code: '7140219', nameVi: 'Sư phạm Địa lý', nameEn: 'Geography Education', nameLao: 'ຄູພູມສາດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 8, code: '7140212', nameVi: 'Sư phạm Hóa học', nameEn: 'Chemistry Education', nameLao: 'ເຄມີສາດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 9, code: '7140218', nameVi: 'Sư phạm Lịch sử', nameEn: 'History Education', nameLao: 'ຄູປະຫວັດສາດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 10, code: '7140217', nameVi: 'Sư phạm Ngữ văn', nameEn: 'Philology Education', nameLao: 'ຄູວັນນະຄະດີ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 11, code: '7140213', nameVi: 'Sư phạm Sinh học', nameEn: 'Biology Education', nameLao: 'ຄູຊີວະສາດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 12, code: '7140231', nameVi: 'Sư phạm Tiếng Anh', nameEn: 'English Education', nameLao: 'ຄູ ພາສາອັງກິດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Ngoại ngữ' },
  { no: 13, code: '7140231C', nameVi: 'Sư phạm Tiếng Anh (Lớp Tài năng)', nameEn: 'English Education (Talent class)', nameLao: 'ຄູ ພາສາອັງກິດ (ຫ້ອງຮຽນພອນສະຫວັນ)', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Ngoại ngữ' },
  { no: 14, code: '7140210', nameVi: 'Sư phạm Tin học', nameEn: 'IT Education', nameLao: 'ຄູໄອທີ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'CNTT' },
  { no: 15, code: '7140209', nameVi: 'Sư phạm Toán học', nameEn: 'Mathematics Education', nameLao: 'ຄູຄະນິດສາດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 16, code: '7140209C', nameVi: 'Sư phạm Toán học (Chất lượng cao)', nameEn: 'High quality Mathematics Education', nameLao: 'ຄູຄະນິດສາດ (ຄຸນນະພາບສູງ)', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 17, code: '7140211', nameVi: 'Sư phạm Vật lý', nameEn: 'Physics Education', nameLao: 'ຄູຟີຊິກ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Sư phạm' },
  { no: 18, code: '7340301', nameVi: 'Kế toán', nameEn: 'Accounting', nameLao: 'ການບັນຊີ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kinh tế' },
  { no: 19, code: '7380101', nameVi: 'Luật học', nameEn: 'Law', nameLao: 'ກົດໝາຍ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Luật' },
  { no: 20, code: '7380107', nameVi: 'Luật Kinh tế', nameEn: 'Economic Law', nameLao: 'ກົດໝາຍເສດຖະກິດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Luật' },
  { no: 21, code: '7340101', nameVi: 'Quản trị Kinh doanh', nameEn: 'Business administration', nameLao: 'ບໍລິຫານທຸລະກິດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kinh tế' },
  { no: 22, code: '7340101C', nameVi: 'Quản trị Kinh doanh (Chất lượng cao)', nameEn: 'High quality Business administration', nameLao: 'ການບໍລິຫານທຸລະກິດທີ່ມີຄຸນນະພາບສູງ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kinh tế' },
  { no: 23, code: '7340201', nameVi: 'Tài chính - Ngân hàng', nameEn: 'Finance and Banking', nameLao: 'ການເງິນການທະນາຄານ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kinh tế' },
  { no: 24, code: '7340122', nameVi: 'Thương mại Điện tử', nameEn: 'Electronic Commerce (E-commerce)', nameLao: 'E-commerce ອີຄອມເມີດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kinh tế' },
  { no: 25, code: '7580301', nameVi: 'Kinh tế Xây dựng', nameEn: 'Construction Economics', nameLao: 'ເສດຖະກິດການກໍ່ສ້າງ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kỹ thuật' },
  { no: 26, code: '7420201', nameVi: 'Công nghệ Sinh học', nameEn: 'Biotechnology', nameLao: 'ເຕັກໂນໂລຊີຊີວະພາບ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Khoa học Tự nhiên' },
  { no: 27, code: '7460202', nameVi: 'Khoa học Dữ liệu và Thống kê', nameEn: 'Data Science and Statistics', nameLao: 'ວິທະຍາສາດຂໍ້ມູນ ແລະສະຖິຕິ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'CNTT' },
  { no: 28, code: '7620105', nameVi: 'Chăn nuôi (Chuyên ngành Thú y)', nameEn: 'Breeding (Specialization in Veterinary)', nameLao: 'ລ້ຽງສັດ (ສັດວະແພດ)', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Nông nghiệp' },
  { no: 29, code: '7510301', nameVi: 'Kỹ thuật Điện, Điện tử', nameEn: 'Electrical and Electronic Engineering', nameLao: 'ວິສະວະກຳໄຟຟ້າ ແລະເອເລັກໂຕຣນິກ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' },
  { no: 30, code: '7510206', nameVi: 'Kỹ thuật Nhiệt (Nhiệt điện lạnh)', nameEn: 'Thermal Engineering (thermoelectric refrigeration)', nameLao: 'ວິສະວະກຳຄວາມຮ້ອນ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' },
  { no: 31, code: '7510205', nameVi: 'Công nghệ Kỹ thuật Ô tô', nameEn: 'Automotive Engineering Technology', nameLao: 'ວິສະວະກຳເຕັກນິກລົດຍົນ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' },
  { no: 32, code: '7480201', nameVi: 'Công nghệ Thông tin', nameEn: 'Information Technology', nameLao: 'ວິສະວະກຳ ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'CNTT' },
  { no: 33, code: '7480201C', nameVi: 'Công nghệ Thông tin (Chất lượng cao)', nameEn: 'High quality Information Technology', nameLao: 'ວິສະວະກຳ ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ (ຄຸນນະພາບສູງ)', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'CNTT' },
  { no: 34, code: '7480101', nameVi: 'Khoa học Máy tính', nameEn: 'Computer Science', nameLao: 'ວິທະຍາສາດຄອມພິວເຕີ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'CNTT' },
  { no: 35, code: '7540101', nameVi: 'Công nghệ Thực phẩm', nameEn: 'Food technology', nameLao: 'ເຕັກໂນໂລຊີປຸງແຕ່ງອາຫານ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kỹ thuật' },
  { no: 36, code: '7520207', nameVi: 'Kỹ thuật Điện tử và Viễn thông', nameEn: 'Electronic and Telecommunications Engineering', nameLao: 'ວິສະວະກຳເອເລັກໂຕຣນິກ ແລະ ໂທລະຄົມມະນາຄົມ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' },
  { no: 37, code: '7520216', nameVi: 'Kỹ thuật Điều khiển và Tự động hóa', nameEn: 'Control and Automation Engineering', nameLao: 'ວິສະວະກຳການຄວບຄຸມແລະອັດຕະໂນມັດ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' },
  { no: 38, code: '7480103', nameVi: 'Kỹ thuật Phần mềm', nameEn: 'Software Engineering', nameLao: 'ເຕັກໂນໂລຊີຊອບແວ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'CNTT' },
  { no: 39, code: '7580201', nameVi: 'Kỹ thuật Xây dựng (Kỹ thuật Công trình)', nameEn: 'Construction Engineering', nameLao: 'ວິສະວະກຳການກໍ່ສ້າງ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' },
  { no: 40, code: '7580205', nameVi: 'Kỹ thuật Xây dựng Công trình Giao thông', nameEn: 'Traffic Work Building Engineering', nameLao: 'ວິສະວະກຳກໍ່ສ້າງຂົວທາງ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' },
  { no: 41, code: '7620109', nameVi: 'Nông học (Trồng trọt)', nameEn: 'Agronomy', nameLao: 'ກະສິກຳ (ປູກຝັງ)', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Nông nghiệp' },
  { no: 42, code: '7620301', nameVi: 'Nuôi trồng Thủy sản', nameEn: 'Aquaculture', nameLao: 'ການລ້ຽງສັດນ້ຳ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Nông nghiệp' },
  { no: 43, code: '7720301', nameVi: 'Điều dưỡng', nameEn: 'Nursing', nameLao: 'ພະຍາບານ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Y - Dược' },
  { no: 44, code: '7320101', nameVi: 'Báo chí', nameEn: 'Journalism', nameLao: 'ໜັງສືພິມ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Xã hội' },
  { no: 45, code: '7310201', nameVi: 'Chính trị học', nameEn: 'Political Science', nameLao: 'ວິຊາການເມືອງ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Xã hội' },
  { no: 46, code: '7760101', nameVi: 'Công tác Xã hội', nameEn: 'Social Works', nameLao: 'ວຽກງານສັງຄົມ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Xã hội' },
  { no: 47, code: '7810101', nameVi: 'Du lịch', nameEn: 'Tourism', nameLao: 'ສາຂາ ການທ່ອງທ່ຽວ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Du lịch' },
  { no: 48, code: '7310101', nameVi: 'Kinh tế (Kinh tế Đầu tư & Quản lý Kinh tế)', nameEn: 'Economics (Investment & Management)', nameLao: 'ເສດຖະສາດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Kinh tế' },
  { no: 49, code: '7220201', nameVi: 'Ngôn ngữ Anh', nameEn: 'English Language', nameLao: 'ພາສາອັງກິດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Ngoại ngữ' },
  { no: 50, code: '7850103', nameVi: 'Quản lý Đất đai', nameEn: 'Land Management', nameLao: 'ຄຸ້ມຄອງທີ່ດິນ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Môi trường' },
  { no: 51, code: '7310205', nameVi: 'Quản lý Nhà nước', nameEn: 'State Management', nameLao: 'ຄຸ້ມຄອງລັດ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Luật - QLNN' },
  { no: 52, code: '7850101', nameVi: 'Quản lý Tài nguyên và Môi trường', nameEn: 'Natural Resource and Environment Management', nameLao: 'ຄຸ້ມຄອງຊັບພະຍາກອນ ແລະ ສິ່ງແວດລ້ອມ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Môi trường' },
  { no: 53, code: '7229042', nameVi: 'Quản lý Văn hóa', nameEn: 'Culture Management', nameLao: 'ຄຸ້ມຄອງວັດທະນະທຳ', level: 'undergraduate', durationYears: '4 năm', facultyGroup: 'Xã hội' },
  { no: 54, code: '7520210', nameVi: 'Kỹ thuật Điện tử và Tin học', nameEn: 'Electronic engineering and informatics', nameLao: 'ວິສະວະກຳເອເລັກໂຕຣນິກ ແລະ ຂໍ້ມູນຂ່າວສານ', level: 'undergraduate', durationYears: '4.5 năm', facultyGroup: 'Kỹ thuật' }
];

// 36 Master's Programs (Trích xuất từ Bảng Thạc sĩ - Ảnh 1 & Ảnh 4)
export const internationalMasterMajors: InternationalMajor[] = [
  { no: 1, code: '8310201', nameVi: 'Chính trị học', nameEn: 'Political Science', nameLao: 'ວິຊາການເມືອງ', level: 'master', durationYears: '2 năm', facultyGroup: 'Khoa học Xã hội' },
  { no: 2, code: '8480201', nameVi: 'Công nghệ Thông tin', nameEn: 'Information Technology', nameLao: 'ວິສະວະກຳ ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ', level: 'master', durationYears: '2 năm', facultyGroup: 'CNTT' },
  { no: 3, code: '8460104', nameVi: 'Đại số và Lý thuyết Số', nameEn: 'Algebra and Number Theory', nameLao: 'ພຶດຊະຄະນິດ ແລະ ທິດສະດີຈຳນວນ', level: 'master', durationYears: '2 năm', facultyGroup: 'Toán học' },
  { no: 4, code: '8310501', nameVi: 'Địa lý học', nameEn: 'Geography', nameLao: 'ພູມສາດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Tự nhiên' },
  { no: 5, code: '8420103', nameVi: 'Động vật học', nameEn: 'Zoology', nameLao: 'ສັດຕະວິທະຍາ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sinh học' },
  { no: 6, code: '8140101', nameVi: 'Giáo dục học (Mầm non)', nameEn: 'Pedagogics (Early Childhood Education)', nameLao: 'ສຶກສາສາດ (ຊັ້ນອະນຸບານ)', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 7, code: '8140101', nameVi: 'Giáo dục học (Tiểu học)', nameEn: 'Pedagogics (Primary Education)', nameLao: 'ສຶກສາສາດ (ຊັ້ນປະຖົມ)', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 8, code: '8140101', nameVi: 'Giáo dục học (Thể chất)', nameEn: 'Pedagogics (Physical Education)', nameLao: 'ສຶກສາສາດ (ການສຶກສາທາງດ້ານຮ່າງກາຍ)', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 9, code: '8440114', nameVi: 'Hóa hữu cơ', nameEn: 'Organic chemistry', nameLao: 'ເຄມີອົງຄະທາດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Hóa học' },
  { no: 10, code: '8440118', nameVi: 'Hóa phân tích', nameEn: 'Analytical chemistry', nameLao: 'ເຄມີວິເຄາະ', level: 'master', durationYears: '2 năm', facultyGroup: 'Hóa học' },
  { no: 11, code: '8440113', nameVi: 'Hóa vô cơ', nameEn: 'Inorganic chemistry', nameLao: 'ເຄມີອະນົງຄະທາດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Hóa học' },
  { no: 12, code: '8620110', nameVi: 'Khoa học Cây trồng', nameEn: 'Crop Science', nameLao: 'ວິທະຍາສາດການປູກພືດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Nông nghiệp' },
  { no: 13, code: '8310102', nameVi: 'Kinh tế Chính trị', nameEn: 'Political Economy', nameLao: 'ເສດຖະກິດການເມືອງ', level: 'master', durationYears: '2 năm', facultyGroup: 'Kinh tế' },
  { no: 14, code: '8580201', nameVi: 'Kỹ thuật Xây dựng', nameEn: 'Construction Engineering', nameLao: 'ວິສະວະກຳການກໍ່ສ້າງ', level: 'master', durationYears: '2 năm', facultyGroup: 'Kỹ thuật' },
  { no: 15, code: '8229011', nameVi: 'Lịch sử Thế giới', nameEn: 'World History', nameLao: 'ປະຫວັດສາດໂລກ', level: 'master', durationYears: '2 năm', facultyGroup: 'Lịch sử' },
  { no: 16, code: '8229013', nameVi: 'Lịch sử Việt Nam', nameEn: 'Vietnam History', nameLao: 'ປະຫວັດສາດຫວຽດນາມ', level: 'master', durationYears: '2 năm', facultyGroup: 'Lịch sử' },
  { no: 17, code: '8380106', nameVi: 'Lý luận và Lịch sử Nhà nước & Pháp luật', nameEn: 'General theory and history of state and law', nameLao: 'ທິດສະດີປະຫວັດສາດລັດແລະກົດໝາຍ', level: 'master', durationYears: '2 năm', facultyGroup: 'Luật' },
  { no: 18, code: '8140111', nameVi: 'Lý luận và PPDH Giáo dục Chính trị', nameEn: 'Theory & Method of Political Ed Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາການເມືອງ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 19, code: '8140111', nameVi: 'Lý luận và PPDH Hóa học', nameEn: 'Theory & Method of Chemistry Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາເຄມີສາດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 20, code: '8140111', nameVi: 'Lý luận và PPDH Ngữ văn', nameEn: 'Theory & Method of Literature Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາວັນນະຄະດີ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 21, code: '8140111', nameVi: 'Lý luận và PPDH Sinh học', nameEn: 'Theory & Method of Biology Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາຊີວະສາດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 22, code: '8140111', nameVi: 'Lý luận và PPDH Tiếng Anh', nameEn: 'Theory & Method of English Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາພາສາອັງກິດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Ngoại ngữ' },
  { no: 23, code: '8140111', nameVi: 'Lý luận và PPDH Toán học', nameEn: 'Theory & Method of Maths Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາຄະນິດສາດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 24, code: '8140111', nameVi: 'Lý luận và PPDH Vật lý', nameEn: 'Theory & Method of Physics Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາຟີຊິກ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sư phạm' },
  { no: 25, code: '8220120', nameVi: 'Lý luận Văn học', nameEn: 'Literary Theories', nameLao: 'ທິດສະດີວັນນະຄະດີ', level: 'master', durationYears: '2 năm', facultyGroup: 'Văn học' },
  { no: 26, code: '8460106', nameVi: 'Lý thuyết Xác suất & Thống kê Toán', nameEn: 'Probability theory and mathematical statistics', nameLao: 'ທິດສະດີຄວາມເປັນໄປໄດ້ ແລະ ສະຖິຕິຄະນິດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Toán học' },
  { no: 27, code: '8220102', nameVi: 'Ngôn ngữ học Việt Nam', nameEn: 'Vietnamese Language', nameLao: 'ພາສາສາດ (ພາສາຫວຽດນາມ)', level: 'master', durationYears: '2 năm', facultyGroup: 'Ngôn ngữ' },
  { no: 28, code: '8620301', nameVi: 'Nuôi trồng Thủy sản', nameEn: 'Aquaculture', nameLao: 'ການລ້ຽງສັດນ້ຳ', level: 'master', durationYears: '2 năm', facultyGroup: 'Nông nghiệp' },
  { no: 29, code: '8140114', nameVi: 'Quản lý Giáo dục', nameEn: 'Educational Management', nameLao: 'ຄຸ້ມຄອງການສຶກສາ', level: 'master', durationYears: '2 năm', facultyGroup: 'Quản lý' },
  { no: 30, code: '8310110', nameVi: 'Quản lý Kinh tế', nameEn: 'Economic Management', nameLao: 'ສາຂາຄຸ້ມຄອງເສດຖະກິດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Kinh tế' },
  { no: 31, code: '8340101', nameVi: 'Quản trị Kinh doanh', nameEn: 'Business Administration', nameLao: 'ບໍລິຫານທຸລະກິດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Kinh tế' },
  { no: 32, code: '8440110', nameVi: 'Quang học', nameEn: 'Optics', nameLao: 'ວິຊາແສງ', level: 'master', durationYears: '2 năm', facultyGroup: 'Vật lý' },
  { no: 33, code: '8420114', nameVi: 'Sinh lý học Thực vật', nameEn: 'Experimental Biology', nameLao: 'ການທົດລອງທາງຊີວະວິທະຍາ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sinh học' },
  { no: 34, code: '8420111', nameVi: 'Thực vật học', nameEn: 'Botany', nameLao: 'ພຶກສາສາດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Sinh học' },
  { no: 35, code: '8460102', nameVi: 'Toán giải tích', nameEn: 'Mathematical Analysis', nameLao: 'ວິເຄາະຄະນິດ', level: 'master', durationYears: '2 năm', facultyGroup: 'Toán học' },
  { no: 36, code: '8220121', nameVi: 'Văn học Việt Nam', nameEn: 'Vietnamese Literature', nameLao: 'ວັນນະຄະດີຫວຽດນາມ', level: 'master', durationYears: '2 năm', facultyGroup: 'Văn học' }
];

// 16 Doctoral (PhD) Programs (Trích xuất từ Bảng Tiến sĩ - Ảnh 1 & Ảnh 4)
export const internationalDoctoralMajors: InternationalMajor[] = [
  { no: 1, code: '9310201', nameVi: 'Chính trị học', nameEn: 'Political Science', nameLao: 'ວິຊາການເມືອງ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Khoa học Xã hội' },
  { no: 2, code: '9480201', nameVi: 'Công nghệ Thông tin', nameEn: 'Information Technology', nameLao: 'ວິສະວະກຳ ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'CNTT' },
  { no: 3, code: '9440114', nameVi: 'Hóa học hữu cơ', nameEn: 'Organic Chemistry', nameLao: 'ເຄມີອົງຄະທາດ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Hóa học' },
  { no: 4, code: '9229011', nameVi: 'Lịch sử Thế giới', nameEn: 'World History', nameLao: 'ປະຫວັດສາດໂລກ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Lịch sử' },
  { no: 5, code: '9229013', nameVi: 'Lịch sử Việt Nam', nameEn: 'Vietnam History', nameLao: 'ປະຫວັດສາດຫວຽດນາມ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Lịch sử' },
  { no: 6, code: '9140111', nameVi: 'Lý luận và PPDH Hóa học', nameEn: 'Theory & Method of Chemistry Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາເຄມີສາດ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Sư phạm' },
  { no: 7, code: '9140111', nameVi: 'Lý luận và PPDH Toán học', nameEn: 'Theory & Method of Maths Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາຄະນິດສາດ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Sư phạm' },
  { no: 8, code: '9140111', nameVi: 'Lý luận và PPDH Vật lý', nameEn: 'Theory & Method of Physics Teaching', nameLao: 'ທິດສະດີ ແລະ ວິທີການສອນວິຊາຟີຊິກ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Sư phạm' },
  { no: 9, code: '9460106', nameVi: 'Lý thuyết Xác suất & Thống kê Toán', nameEn: 'Probability theory and mathematical statistics', nameLao: 'ທິດສະດີຄວາມເປັນໄປໄດ້ ແລະ ສະຖິຕິຄະນິດ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Toán học' },
  { no: 10, code: '9220102', nameVi: 'Ngôn ngữ học Việt Nam', nameEn: 'Vietnamese Language', nameLao: 'ພາສາສາດ (ພາສາຫວຽດນາມ)', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Ngôn ngữ' },
  { no: 11, code: '9140114', nameVi: 'Quản lý Giáo dục', nameEn: 'Educational Management', nameLao: 'ຄຸ້ມຄອງການສຶກສາ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Quản lý' },
  { no: 12, code: '9310110', nameVi: 'Quản lý Kinh tế', nameEn: 'Economic Management', nameLao: 'ສາຂາຄຸ້ມຄອງເສດຖະກິດ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Kinh tế' },
  { no: 13, code: '9440110', nameVi: 'Quang học', nameEn: 'Optics', nameLao: 'ວິຊາແສງ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Vật lý' },
  { no: 14, code: '9420111', nameVi: 'Thực vật học', nameEn: 'Botany', nameLao: 'ພຶກສາສາດ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Sinh học' },
  { no: 15, code: '9460102', nameVi: 'Toán giải tích', nameEn: 'Mathematical Analysis', nameLao: 'ວິເຄາະຄະນິດ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Toán học' },
  { no: 16, code: '9220121', nameVi: 'Văn học Việt Nam', nameEn: 'Vietnamese Literature', nameLao: 'ວັນນະຄະດີຫວຽດນາມ', level: 'doctoral', durationYears: '3 - 4 năm', facultyGroup: 'Văn học' }
];

// Mức thu kinh phí (Bảng chi phí USD chuẩn từ Ảnh 2 & Ảnh 3)
export const internationalFees: InternationalFeeStructure[] = [
  {
    itemVi: 'Khóa học Dự bị Tiếng Việt (10 tháng)',
    itemEn: 'Vietnamese language preparatory programme (10 months)',
    itemLao: 'ຮຽນພາສາຫວຽດ (10 ເດືອນ)',
    amountUsd: 500,
    period: '500 USD / năm học (10 tháng)',
    details: 'Dành cho thí sinh chưa có chứng chỉ B2 tiếng Việt do ĐH Vinh hoặc các trường được Bộ GD&ĐT công nhận cấp.'
  },
  {
    itemVi: 'Học phí Bậc Đại học (Cử nhân / Kỹ sư)',
    itemEn: 'Undergraduate tuition fee (Bachelor / Engineering)',
    itemLao: 'ມະຫາວິທະຍາໄລ (ລະດັບປະລິນຍາຕີ)',
    amountUsd: 500,
    period: '500 USD / năm học (10 tháng)',
    details: 'Áp dụng cho 54 ngành đào tạo trình độ đại học tại Trường Đại học Vinh.'
  },
  {
    itemVi: 'Học phí Bậc Thạc sĩ',
    itemEn: "Master's degree programme tuition fee",
    itemLao: 'ປະລິນຍາໂທ (ລະດັບປະລິນຍາໂທ)',
    amountUsd: 800,
    period: '800 USD / năm học',
    details: 'Áp dụng cho 36 chuyên ngành đào tạo thạc sĩ nghiên cứu và ứng dụng.'
  },
  {
    itemVi: 'Học phí Bậc Tiến sĩ (Nghiên cứu sinh)',
    itemEn: 'Doctoral degree (PhD) programme tuition fee',
    itemLao: 'ປະລິນຍາເອກ (ລະດັບປະລິນຍາເອກ)',
    amountUsd: 1000,
    period: '1,000 USD / năm học',
    details: 'Áp dụng cho 16 chuyên ngành đào tạo tiến sĩ định hướng học thuật cao cấp.'
  },
  {
    itemVi: 'Ký túc xá Lưu học sinh (Dormitory)',
    itemEn: 'Accommodation fee in International Dormitory',
    itemLao: 'ຄ່າຫໍພັກ (ຫໍພັກນັກສຶກສາຕ່າງປະເທດ)',
    amountUsd: 10,
    period: '10 USD / tháng (100 USD / năm 10 tháng)',
    details: 'Phòng khép kín 30.5 m² cho 4 người. Bao gồm 3 m³ nước sinh hoạt và 6 kWh điện miễn phí mỗi tháng.'
  },
  {
    itemVi: 'Bảo hiểm tai nạn (Accident insurance)',
    itemEn: 'Accident insurance (paid once for whole study pathway)',
    itemLao: 'ປະກັນໄພອຸບັດຕິເຫດ (ຈ່າຍເທື່ອດຽວຕະຫຼອດຫຼັກສູດ)',
    amountUsd: 20,
    period: '20 USD / sinh viên (đóng 1 lần duy nhất toàn khóa)',
    details: 'Bảo hiểm toàn diện trong khuôn viên trường và quá trình học tập tại Việt Nam.'
  }
];

// 3 Loại Học bổng dành cho Lưu học sinh (Từ Ảnh 5)
export const internationalScholarships: InternationalScholarship[] = [
  {
    id: 'agreement',
    titleVi: 'Học bổng Hiệp định Chính phủ (Việt Nam - Lào)',
    titleEn: 'Government Agreement Full Scholarship (Vietnam - Laos)',
    titleLao: 'ທຶນການສຶກສາສັນຍາລັດຖະບານ (ຫວຽດນາມ - ລາວ)',
    fundingBody: 'Bộ Giáo dục & Đào tạo Việt Nam & Bộ Giáo dục & Thể thao Lào',
    coverage: [
      'Miễn 100% học phí toàn khóa học (bao gồm 1 năm học dự bị tiếng Việt)',
      'Miễn 100% chi phí ký túc xá tại Làng Sinh viên ĐH Vinh',
      'Cấp sinh hoạt phí hàng tháng theo định mức của Bộ Tài chính',
      'Cung cấp trang thiết bị ban đầu, vé tàu xe khứ hồi khi nhập học và tốt nghiệp'
    ],
    targetAudience: 'Lưu học sinh diện hiệp định hợp tác được các cơ quan hữu quan tuyển chọn và cử đi học.',
    notes: 'Hồ sơ do Đại sứ quán hoặc Bộ Giáo dục và Thể thao Lào bàn giao cho Trường Đại học Vinh tiếp nhận.'
  },
  {
    id: 'province',
    titleVi: 'Học bổng Tài trợ của UBND Tỉnh Nghệ An',
    titleEn: 'Nghe An Provincial People\'s Committee Annual Scholarship',
    titleLao: 'ທຶນການສຶກສາອຸປະຖຳຂອງແຂວງເຫງະອານ',
    fundingBody: 'Ủy ban Nhân dân Tỉnh Nghệ An (Việt Nam)',
    coverage: [
      'Được UBND Tỉnh Nghệ An chi trả toàn bộ học phí và phí phòng ký túc xá',
      'Được cấp kinh phí sinh hoạt phí hàng tháng',
      'Được hỗ trợ kinh phí mua sắm vật dụng ban đầu khi sang nhập học'
    ],
    targetAudience: 'Lưu học sinh các tỉnh bạn của nước CHDCND Lào (Hủa Phăn, Xiêng Khoảng, Bôlikhămxay, Viêng Chăn...) có ký kết thỏa thuận hợp tác với tỉnh Nghệ An.',
    notes: 'Xét tuyển theo danh sách đề cử chính thức của chính quyền các tỉnh bạn Lào.'
  },
  {
    id: 'self-funded',
    titleVi: 'Học bổng Doanh nghiệp & Diện Tự túc / Thỏa thuận MOU',
    titleEn: 'Self-Funded & MOU Cooperation Agreement Programme',
    titleLao: 'ທຶນຮ່ວມມື MOU ແລະ ນັກສຶກສາທຶນຕົນເອງ',
    fundingBody: 'Người học tự chi trả hoặc theo Thỏa thuận hợp tác giữa ĐH Vinh và các Sở GD-TT Lào / Tổ chức quốc tế',
    coverage: [
      'Mức học phí ưu đãi đặc biệt: Chỉ 500 USD/năm (bậc đại học) và 800 USD/năm (thạc sĩ)',
      'Ký túc xá chỉ 10 USD/tháng với định mức hỗ trợ 3 m³ nước và 6 kWh điện miễn phí',
      'Cơ hội nhận Học bổng Khuyến khích học tập của Hiệu trưởng ĐH Vinh (50% - 100% học phí các kỳ tiếp theo) nếu đạt kết quả học tập xuất sắc'
    ],
    targetAudience: 'Công dân tất cả các quốc gia trên thế giới có nguyện vọng học tập tại Trường Đại học Vinh (Lào, Campuchia, Thái Lan, Hàn Quốc, Trung Quốc, Pháp, Châu Phi, v.v.).',
    notes: 'Quy trình xét tuyển hồ sơ trực tuyến thuận tiện, xét duyệt và cấp Thư mời nhập học (Offer Letter) trong vòng 3 - 5 ngày làm việc.'
  }
];

// Danh mục 13 Hồ sơ & Minh chứng bắt buộc (Ảnh 2 & Ảnh 3)
export const internationalDocumentChecklist: InternationalDocumentItem[] = [
  {
    id: 'doc-1',
    sectionNumber: '3.1',
    titleVi: 'Đơn xin đăng ký nhập học (Application Form)',
    titleEn: 'Application form for international admission (downloadable template)',
    titleLao: 'ໃບລົງທະບຽນເຂົ້າຮຽນ (ຕາມແບບຟອມ)',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Tải theo mẫu quy định của ĐH Vinh: https://vinhuni.edu.vn/app-form'
  },
  {
    id: 'doc-2',
    sectionNumber: '3.2',
    titleVi: 'Sơ yếu lý lịch (CV có dán ảnh và chứng thực của chính quyền địa phương)',
    titleEn: 'Curriculum Vitae (CV with photograph and certification by local authority)',
    titleLao: 'ຊີວະປະຫວັດ (ຕ້ອງຕິດຮູບແລະປະທັບກາ)',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Dịch thuật công chứng sang tiếng Việt hoặc tiếng Anh.'
  },
  {
    id: 'doc-3',
    sectionNumber: '3.3',
    titleVi: 'Bản sao bằng tốt nghiệp và Bảng kết quả học tập / Học bạ',
    titleEn: 'Diploma and academic transcript of the preceding degree',
    titleLao: 'ໃບປະກາສະນີຍະບັດ ແລະ ປື້ມຕິດຕາມຜົນການຮຽນ',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Bằng THPT (đối với ĐH), Bằng ĐH (đối với ThS), Bằng ThS (đối với TS).'
  },
  {
    id: 'doc-4',
    sectionNumber: '3.4',
    titleVi: 'Giấy chứng nhận sức khỏe có dán ảnh (cấp trong vòng 06 tháng)',
    titleEn: 'Health certificate with photograph issued within 6 months',
    titleLao: 'ໃບກວດສຸຂະພາບ (ບໍ່ເກີນ 06 ເດືອນ)',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Do bệnh viện cấp tỉnh hoặc trung ương của nước sở tại/Việt Nam cấp, không mắc bệnh truyền nhiễm.'
  },
  {
    id: 'doc-5',
    sectionNumber: '3.5',
    titleVi: 'Chứng chỉ trình độ tiếng Việt (Trình độ B2 hoặc tương đương)',
    titleEn: 'Certificate of Vietnamese Language Proficiency (B2 level or enroll 1-year prep)',
    titleLao: 'ໃບປະກາສະນີຍະບັດຈົບຊັ້ນພາສາຫວຽດ',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: false,
    notes: 'Nếu chưa có chứng chỉ B2, thí sinh bắt buộc đăng ký học 01 năm tiếng Việt dự bị tại ĐH Vinh trước khi vào chuyên ngành.'
  },
  {
    id: 'doc-6',
    sectionNumber: '3.6',
    titleVi: 'Quyết định cử đi học của cơ quan công tác (nếu có)',
    titleEn: 'Decision on overseas study permission by the employer (if any)',
    titleLao: 'ຂໍ້ຕົກລົງຂອງກະຊວງ ຫຼື ອົງການຈັດຕັ້ງ',
    requiredFor: ['master', 'doctoral'],
    isMandatory: false,
    notes: 'Dành cho đối tượng cán bộ, giảng viên, viên chức nhà nước.'
  },
  {
    id: 'doc-7',
    sectionNumber: '3.7',
    titleVi: 'Giấy xác nhận bảo lãnh tài chính',
    titleEn: 'Financial statement / guarantee for student’s studies and living expenses',
    titleLao: 'ໃບຮັບປະກັນດ້ານການເງິນ',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Cam kết khả năng chi trả học phí và sinh hoạt phí trong suốt khóa học.'
  },
  {
    id: 'doc-8',
    sectionNumber: '3.8',
    titleVi: 'Đề cương nghiên cứu chuyên sâu (Dành riêng cho Bậc Tiến sĩ)',
    titleEn: 'Detailed Research Proposal (PhD applicants only)',
    titleLao: 'ຫົວຂໍ້ຄົ້ນຄວ້າ (ສຳລັບປະລິນຍາເອກ)',
    requiredFor: ['doctoral'],
    isMandatory: true,
    notes: 'Trình bày đề tài nghiên cứu dự kiến, tổng quan tài liệu và phương pháp luận.'
  },
  {
    id: 'doc-9',
    sectionNumber: '3.9',
    titleVi: '02 Thư giới thiệu của các nhà khoa học (Dành cho Tiến sĩ)',
    titleEn: 'Two recommendation letters from scientists/professors (PhD only)',
    titleLao: 'ໜັງສືແນະນຳ 02 ສະບັບ',
    requiredFor: ['doctoral'],
    isMandatory: true,
    notes: 'Từ 02 Giáo sư / Phó Giáo sư hoặc Tiến sĩ cùng ngành chuyên môn.'
  },
  {
    id: 'doc-10',
    sectionNumber: '3.10',
    titleVi: 'Minh chứng năng khiếu, giải thưởng, bài báo khoa học (nếu có)',
    titleEn: 'Proofs of aptitude, special courses, scientific publications, achievements',
    titleLao: 'ຜົນງານການຄົ້ນຄວ້າ ຫຼື ພອນສະຫວັນ',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: false,
    notes: 'Ưu tiên cộng điểm xét học bổng khuyến khích tài năng.'
  },
  {
    id: 'doc-11',
    sectionNumber: '3.11',
    titleVi: 'Hộ chiếu (Passport) còn hạn sử dụng ít nhất 06 tháng',
    titleEn: 'Passport with validity of more than 6 months (certified copy + original for check)',
    titleLao: 'ໜັງສືຜ່ານແດນ (Passport)',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Kèm theo visa thị thực vào Việt Nam khi hoàn tất thủ tục.'
  },
  {
    id: 'doc-12',
    sectionNumber: '3.12',
    titleVi: 'Giấy báo triệu tập trúng tuyển nhập học (Offer Letter)',
    titleEn: 'Official Admission Offer Letter from Vinh University (original)',
    titleLao: 'ໃບແຈ້ງການມາລົງທະບຽນຮຽນ',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Do Trường Đại học Vinh cấp sau khi hồ sơ xét tuyển được phê duyệt.'
  },
  {
    id: 'doc-13',
    sectionNumber: '3.13',
    titleVi: '08 ảnh chân dung kích thước 3x4 chụp trên nền trắng',
    titleEn: '08 passport-sized photos (3x4 cm) with white background',
    titleLao: 'ຮູບ 3x4 ຈຳນວນ 8 ໃບ',
    requiredFor: ['undergraduate', 'master', 'doctoral'],
    isMandatory: true,
    notes: 'Chụp không quá 6 tháng, ghi rõ họ tên và ngày sinh phía sau ảnh.'
  }
];

// Cán bộ liên hệ & Hỗ trợ Sinh viên Quốc tế (Ảnh 2, 3 & 5)
export const internationalContactOfficer = {
  departmentVi: 'Phòng Khoa học & Hợp tác Quốc tế (Phòng Hợp tác Quốc tế)',
  departmentEn: 'Department of Research and International Affairs, Vinh University',
  departmentLao: 'ຫ້ອງການວິທະຍາສາດ ແລະ ການຮ່ວມມືສາກົນ, ມະຫາວິທະຍາໄລວິນ',
  addressVi: 'Tầng 2, Nhà Điều hành, Trường Đại học Vinh, 182 đường Lê Duẩn, TP. Vinh, tỉnh Nghệ An, Việt Nam',
  addressEn: '182 Le Duan Str., Vinh City, Nghe An Province, Vietnam',
  addressLao: 'ຖະໜົນເລຢວານ 182, ນະຄອນວິນ, ແຂວງເຫງະອານ, ຫວຽດນາມ',
  phoneDesk: '+84 (0) 2383 855452 (Máy lẻ / Ext. 689)',
  fax: '+84 (0) 2383 855269',
  email1: 'international@vinhuni.edu.vn',
  email2: 'dsia@vinhuni.edu.vn',
  officerName: 'TS. Phan Văn Tiến (Dr. Phan Van Tien)',
  officerTitleVi: 'Phó Trưởng phòng Khoa học và Hợp tác Quốc tế',
  officerTitleEn: 'Deputy Head of Department of Research and International Affairs',
  officerTitleLao: 'ຮອງຫົວໜ້າຫ້ອງການວິທະຍາສາດ ແລະ ການຮ່ວມມືສາກົນ',
  officerMobile: '+84 (0) 917012255'
};

// Dữ liệu mẫu thí sinh quốc tế để tra cứu hồ sơ (Demo Result Lookup)
export const initialInternationalApplicants: InternationalApplicant[] = [
  {
    id: 'intl-app-001',
    applicationCode: 'VINHUNI-INTL-2026-089',
    passportNumber: 'P01982736',
    fullName: 'SOMXAY VONGPHACHANH',
    gender: 'male',
    dob: '2005-04-12',
    nationality: 'Lào (Lao PDR)',
    countryCode: 'LA',
    email: 'somxay.vong@gmail.com',
    phone: '+856 20 55123456',
    appliedDegree: 'undergraduate',
    appliedMajorCode: '7480201',
    appliedMajorName: 'Công nghệ Thông tin (Information Technology)',
    needsVietnamesePrep: true,
    vietnameseCertificate: 'Chưa có — Đăng ký học 01 năm Dự bị Tiếng Việt',
    scholarshipType: 'agreement',
    status: 'ACCEPTED',
    offerLetterIssued: true,
    offerLetterCode: 'OL-2026-LA-0089',
    submissionDate: '2026-08-15',
    reviewerNotes: 'Hồ sơ đầy đủ, đủ điều kiện tiếp nhận diện Hiệp định Việt - Lào. Được cấp học bổng toàn phần và phòng KTX.'
  },
  {
    id: 'intl-app-002',
    applicationCode: 'VINHUNI-INTL-2026-092',
    passportNumber: 'P08821903',
    fullName: 'KEOMANY SENGSOUVANH',
    gender: 'female',
    dob: '2004-11-28',
    nationality: 'Lào (Lao PDR)',
    countryCode: 'LA',
    email: 'keomany.seng@yahoo.com',
    phone: '+856 20 99887766',
    appliedDegree: 'undergraduate',
    appliedMajorCode: '7340101',
    appliedMajorName: 'Quản trị Kinh doanh (Business Administration)',
    needsVietnamesePrep: false,
    vietnameseCertificate: 'Chứng chỉ Tiếng Việt Trình độ B2 do ĐH Vinh cấp (2025)',
    scholarshipType: 'province',
    status: 'ACCEPTED',
    offerLetterIssued: true,
    offerLetterCode: 'OL-2026-LA-0092',
    submissionDate: '2026-08-18',
    reviewerNotes: 'Đã có B2 tiếng Việt, vào thẳng học kỳ 1 năm thứ nhất. Thuộc diện tài trợ của UBND Tỉnh Nghệ An.'
  },
  {
    id: 'intl-app-003',
    applicationCode: 'VINHUNI-INTL-2026-105',
    passportNumber: 'E98127364',
    fullName: 'MICHAEL DAVID SMITH',
    gender: 'male',
    dob: '1998-07-22',
    nationality: 'Vương Quốc Anh (United Kingdom)',
    countryCode: 'GB',
    email: 'michael.smith@alumni.ac.uk',
    phone: '+44 7700 900077',
    appliedDegree: 'master',
    appliedMajorCode: '8220102',
    appliedMajorName: 'Ngôn ngữ học Việt Nam (Vietnamese Language)',
    needsVietnamesePrep: false,
    vietnameseCertificate: 'Chứng chỉ B2 tiếng Việt Quốc gia',
    scholarshipType: 'self-funded',
    status: 'ACCEPTED',
    offerLetterIssued: true,
    offerLetterCode: 'OL-2026-UK-0105',
    submissionDate: '2026-09-01',
    reviewerNotes: 'Học phí 800 USD/năm, KTX 10 USD/tháng. Đã gửi Thư mời nhập học phục vụ cấp visa du học sinh Việt Nam.'
  },
  {
    id: 'intl-app-004',
    applicationCode: 'VINHUNI-INTL-2026-118',
    passportNumber: 'P07654321',
    fullName: 'BOUNMY CHANTHAVONG',
    gender: 'female',
    dob: '2005-09-05',
    nationality: 'Lào (Lao PDR)',
    countryCode: 'LA',
    email: 'bounmy.ch@gmail.com',
    phone: '+856 20 77654321',
    appliedDegree: 'undergraduate',
    appliedMajorCode: '7140202',
    appliedMajorName: 'Giáo dục Tiểu học (Primary Education)',
    needsVietnamesePrep: true,
    vietnameseCertificate: 'Chưa có',
    scholarshipType: 'agreement',
    status: 'UNDER_REVIEW',
    offerLetterIssued: false,
    submissionDate: '2026-09-20',
    reviewerNotes: 'Đang thẩm định hồ sơ y tế và phê duyệt danh sách tiếp nhận đợt bổ sung từ Đại sứ quán.'
  }
];
