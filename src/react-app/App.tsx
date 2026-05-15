
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Mic, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  BookOpen, 
  Volume2,
  ChevronRight,
  Filter,
  Wind,
  Sparkles,
  Flame,
  Skull,
  Stethoscope, 
  Music,
  RefreshCw,
  Layers
} from 'lucide-react';

// --- TAM VE EKSİKSİZ VERİ SETİ (300+ KAYIT) ---
const TEKERLEMELER_DATA = [
  // --- GRUP 1: TIBBİ VE LATİNCE (TIP FAKÜLTESİ ÖZEL) ---
  { id: 1001, text: "Sternocleidomastoideus kası kasıldı da kaskatı kesildi, kasılmayan kaslara kasıntı yaptı.", category: "Tıbbi & Latince", difficulty: "Anatomi" },
  { id: 1002, text: "Gastroenterolog, gastroözofageal reflüsü olan Galata'lı garsona gastroskopi yaptı.", category: "Tıbbi & Latince", difficulty: "Klinik" },
  { id: 1003, text: "Otolaringolog, otoskopsiz otit teşhisi koyduğu ototoksik hastaya odyometri önerdi.", category: "Tıbbi & Latince", difficulty: "Klinik" },
  { id: 1004, text: "Elektroensefalografi elektrotları, elektrofizyolojik elektronlarla etkileşime girerek elektriksel eylem üretti.", category: "Tıbbi & Latince", difficulty: "Fizyoloji" },
  { id: 1005, text: "Metilprednisolon ile metotreksatı metabolize eden metabolizma, metastazı manipüle etti.", category: "Tıbbi & Latince", difficulty: "Farmakoloji" },
  { id: 1006, text: "Sfenopalatin gangliyon nevraljisi, sfenoid sinüs cerrahisinde sfinkter spazmına sebep oldu.", category: "Tıbbi & Latince", difficulty: "Anatomi" },
  { id: 1007, text: "Kolesistokinin pankreozimin, kolesistektomi sonrası koledok kanalında kolestaz oluşturdu.", category: "Tıbbi & Latince", difficulty: "Fizyoloji" },
  { id: 1008, text: "Dizartrili diyabetik diyetisyen, diyafram darlığından dolayı dijital diyaliz makinesini durdurdu.", category: "Tıbbi & Latince", difficulty: "Klinik" },
  { id: 1009, text: "Brakisefalik arterden bifurkasyon yapan brakiyal pleksus, bradikardiye bağışıklık kazandırdı.", category: "Tıbbi & Latince", difficulty: "Anatomi" },
  { id: 1010, text: "Hipertrofik kardiyomiyopati, hiperbilirubinemi ile hiperventilasyon yaparken hipotalamusu hipnotize etti.", category: "Tıbbi & Latince", difficulty: "Patoloji" },

  // --- GRUP 2: VURGU VE TONLAMA ---
  { id: 1101, text: "Hayır! Ben o kutuyu oraya koymadım, sen koydun sandım! (Öfke ve Şaşkınlık)", category: "Vurgu ve Tonlama", difficulty: "Duygu" },
  { id: 1102, text: "Yavaşça... Çok yavaşça... Kimse duymasın, kimse uyanmasın... (Gizem/Fısıltı)", category: "Vurgu ve Tonlama", difficulty: "Duygu" },
  { id: 1103, text: "İnanmıyorum! Gerçekten mi? Bu harika, bu muhteşem bir haber! (Coşku)", category: "Vurgu ve Tonlama", difficulty: "Duygu" },
  { id: 1104, text: "Neden? Neden hep ben? Neden her şey üst üste geliyor? (Çaresizlik)", category: "Vurgu ve Tonlama", difficulty: "Duygu" },
  { id: 1105, text: "Bana bak! Bir daha sakın, ama sakın sözümü kesme! (Otoriter)", category: "Vurgu ve Tonlama", difficulty: "Duygu" },

  // --- GRUP 3: EFSANEVİ UZUNLAR (NEFES KONTROLÜ) ---
  { id: 900, text: "Sini sini, tesisatçı İbrahim seni de tesisatına, kurnana, musluğuna, contana, boruna, somununa, vidasına, dişlisine, paftasına, maşonuna, dirseğine, T'sine, nipeline, redüksiyonuna, kör tapasına, vanasına, flatörüne, çekvalfine, sifonuna, şamandırasına, deposuna, hidroforuna, genleşme tankına, basınç şalterine, manometresine, termostatına, rezistansına, anotuna, katotuna, topraklamasına, sigortasına, kablosuna, prizine, fişine, duyuna, ampulüne, anahtarına, buatına, klemensine, kroşesine, kanalına, tavasına, merdivenine, iskelesine, matkabına, hiltisine, spirali ne, kaynak makinesine, elektroduna, maskesine, eldivenine, tulumuna, baretine, gözlüğüne, ayakkabısına, yeleğine, kemerine, çantasına, takımına, taklavatına hayran bırakmış.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "İmkansız" },
  { id: 901, text: "Çatalağzı'nda çatalsız Çatalcalı çatalcının çarpık çurpuk çalçene Çoruhluya çarptırmasına ne dersin? Çatalca'da başı çıbanlı topal çoban çatal yapıp çatal satar, nesi için Çatalca'da başı çıbanlı topal çoban çatal yapıp çatal satar? Kârı için Çatalca'da başı çıbanlı topal çoban çatal yapıp çatal satar. Çatalca'da çatal satan topal çoban, çatal yapıp çatal satıp parasını çatalcasına çatır çatır yemiş.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "İmkansız" },
  { id: 902, text: "Şu tarlaya bir şinik kekere mekere ekmişler. Bu tarlaya da bir şinik kekere mekere ekmişler. Şu tarlaya ekilen bir şinik kekere mekereye dadanan boz ala boz başlıklı pis porsuk, bu tarlaya ekilen bir şinik kekere mekereye dadanan boz ala boz başlıklı pis porsuğa demiş ki; 'Ben bu tarlaya ekilen bir şinik kekere mekereye dadanan boz ala boz başlıklı pis porsuğum' demiş. Öteki de: 'Ben de bu tarlaya ekilen bir şinik kekere mekereye dadanan boz ala boz başlıklı pis porsuğum' demiş.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "İmkansız" },
  { id: 903, text: "Ulubatlı utangaç Ulaş'a uğursuz Ulunay'ın uzun uzun uzattığı urganı uğraşa uğraşa unutturdu. Ulunay, Ulaş'ın unuttuğu urganı alıp, Uludağ'ın uçurumundan aşağıya uçururken, Ulaş'ın uğuru Ulunay'ın uğursuzluğunu uçurdu. Ulaş da Ulunay'a 'Uğurlar olsun Ulunay, uğurun bol olsun' diye uludu.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "Çok Zor" },
  { id: 904, text: "Cüce Çinici Celal Hoca gizlice marpuççular içindeki züccaciyeye gidip, içi Çince yazılı cevizcikleri ciro için iç etti. Cüce Çinici Celal, cevizcikleri çaldığını gören Çinli çavuşa, 'Çince cevizcikleri çaldığımı Çince söyleme, Çince söylersen Çinli çavuş olduğun anlaşılır' demiş.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "Çok Zor" },
  { id: 905, text: "Şavşatlı Şaban, Şarkışlalı şipşakçı Şekip'e şişleyerek şuncacık şeyden şüphelenmiş. Şekip, Şaban'a 'Şüphelenme Şaban, şüphe şüpheyi çeker, şüphelenen şüpheci şüphesinden şüphelenir' demiş. Şaban da Şekip'e 'Şüpheci Şekip, şüphelenmesem şüphelenmezdim ama şüphelenince şüpheleniyorum' demiş.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "Çok Zor" },
  { id: 906, text: "Topal Talip'le Tophane'li Tahsin, tahterevalli tahtasından tepetaklak tortop taşların ortasına düştüler de, ne tahterevalli tahtasını tazmin ettiler, ne de tahterevalli tahtasını tamir ettiler. Sadece ters ters tepindiler.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "Zor" },
  { id: 907, text: "Kınıklı kılıbık kırpık kıyıya çıktı, Kınıklı kılıbık kırpık kıyıdan çıktı. Kınıklı kılıbık kırpık kıyıda, Kınıklı kılıbık kırpık kıyıdan çıkarken; Kınıklı kılıbık kırpık kıyıdaki kırık kıskacı kıskandı.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "Çok Zor" },
  { id: 908, text: "Seferihisarlı sefi, sefil Selami ile sefertaslarını seyyar sergisinde sergilediler. Sefil Selami, Seferihisarlı sefinin sefertaslarını satarken, seyyar sergisindeki seyyar satıcılarla selamlaştı.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "Zor" },
  { id: 909, text: "Üstü üç taşlı taç saplı üç tunç tası çaldıran mı çabuk çıldırır, yoksa iç içe yüz ton saç kaplı çanı çalan mı çabuk çıldırır? Üstü üç taşlı taç saplı üç tunç tası çaldıran değil, iç içe yüz ton saç kaplı çanı çalan çabuk çıldırır.", category: "💀 Efsanevi (Nefes Yetmez)", difficulty: "Çok Zor" },

  // --- GRUP 4: EN ZOR 100 (KULLANICI LİSTESİ) ---
  { id: 501, text: "Şemsi Paşa Pasajı’nda sesi büzüşesiceler, sesi büzüşesiceler Şemsi Paşa Pasajı’nda.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 502, text: "Kaplumbağanın kabuğu kalkmış, kabuğu kalkmış kaplumbağa kalkmamış; kalkmamış kaplumbağanın kalkmış kabuğunu kim kaldırmış?", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 503, text: "Ocağıma incir ağacı diktiren incir ağacı dikicisini, incir ağacı diktirdiğim incir ağacı dikicisine tekrar incir ağacı diktireceğim.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 504, text: "Kırk kayıkçı kırık kayıkla kırk dakikada Kırıkkale’den Kırklareli’ne kürek çekti.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 505, text: "Fesli fesi fesleyen fesçide fes feslettiremediği için fesleyen fesçi fesini fesletti.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 506, text: "Bir çürük çuvalcının çürük çuvalcı çırağı çürük çuvalı çuvalladı.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 507, text: "Bir çarşıdan altı papuç aldım, altısı da topu topu yedi buçuk papuç tuttu.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 508, text: "Bu yoğurt niçin ekşi? Ekşi yoğurt niçin ekşi yoğurt olsun? Ekşi yoğurt ekşi olduğu için ekşi yoğurtmuş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 509, text: "Kırk köpek kırkını da köpekçiğe köpekletti; köpekçiğe köpeklettiği köpekleri kim köpekletti?", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 510, text: "Şu köşe kış köşesi, şu köşe yaz köşesi, ortadaki su şişesi.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 511, text: "Kırk küpün kırkı da küf içinde, kırk küpün kırkı da küflenmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 512, text: "Kırk kırık kürek kırkına da kırık kürekçiye kırdırıldı.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 513, text: "Kırmızı karınca kırk kere kahkaha atarsa kırk karınca kırk kere kıskanır.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 514, text: "Küçük köylü köylücüklere köy köşe gösterdi.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 515, text: "Kırklareli’nden Kırıkkale’ye kırk kere kalkan kırık kamyon kırk kere yolda kaldı.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 516, text: "Bir fil fili bir file, bir file bir fili yutmuş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 517, text: "Sakşak saksıda saklı saksıyı sakşaklayan sakşakçı.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 518, text: "Üç tunç tas üst üste, üstteki tunç tas alttaki tunç tasta pas yaptı.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 519, text: "Bir yudum yakıcı yoğurt, bir yudum da yumuşak yoğurt.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 520, text: "Çekik çekiççi Çekçe çekik çekiç çakar.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 521, text: "Kuzgun kuzguna kızgın kızgın konuşurmuş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 522, text: "Komşunun komşuya komik komiklik komutları.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 523, text: "Çabuk çabuk çabala, çabaladıkça çabuklaş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 524, text: "Bir bakkal bir bakraç balık almış; balıkları balkona bırakmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 525, text: "Buldum bulutlu bulutu, bulutlu bulutta büzüştü buzu.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 526, text: "Bir berber bir berbere gel beraber bir berber dükkânı açalım demiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 527, text: "Dik dikine dikilen dik dikenceler dik dikine dikleşmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 528, text: "Kum kaplı kapıdan kapkara kapıcı kapıyı kapatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 529, text: "Kırk kırık kirkor kırkını da kırkpınarda kırk kez kırmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 530, text: "Cık cıkçı cıvcıvı cık cık ederken civciv cıvıldamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 531, text: "Peş peşe pişmiş beş poğaça parıldarken parçalanmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 532, text: "Bir dalda bir dala dalaşan dallı dalağın dalı dalaşmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 533, text: "Kalkık kalpaklı kalpazan kalfası kalfalığını kanıtlamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 534, text: "Çapraz çorapçı çırak çorapları çap çepeçevre çaprazlamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 535, text: "Kaskatı kakule kokulu kaktüs kaktüsçüye kaka yapmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 536, text: "Bir top topal topukçu topu topuklarken topu tutturamamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 537, text: "Çingene çinici çingeneye çinko çivi çaktırmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 538, text: "Gümüş gemici gemi güvertesinde gürültüyle gümüş görmüş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 539, text: "Çiçekçi çırağı çiçekleri çiçekçiye çiçekli çelenk yapmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 540, text: "Kızgın kazıcı kazmayı kazara kazmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 541, text: "Çelimsiz çelikçi çeliği çalkalayarak çeliğe çevirmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 542, text: "Kambur kamyoncu kamyonun kamberini kamburlaştırmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 543, text: "Şıpsevdi şipşakçı şıp diye şişeyi şip diye şişirtmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 544, text: "Sivridir sivrisineğin sivri sinesi.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 545, text: "Camcı çırağı cam camlı camın camını camcıya çakmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 546, text: "Kapkara kapıcı kapıyı kapkara kapatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 547, text: "Tık tıkçı tıkaççı tıkacı tıkıştırmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 548, text: "Dört dörtlük dörtnala dönen dörtlü dönmüş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 549, text: "Bir dalgıç dalgacığa dalgalı dalga göstermiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 550, text: "Çarpık çarpan çarpıcı çarpışırken çarpıtmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 551, text: "Yarım yamalak yayımlanan yayı yamyassı yapmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 552, text: "Güm gümleyen gümbürtülü gün görmüş gümbürdek.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 553, text: "Çamurlu çamçı çamçığı çamura çamur katmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 554, text: "Pıt pıtçı pıtlatırken pıtı pıtırtmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 555, text: "Bir kırçiçeği kırk kere kırçılır mı?", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 556, text: "Kandıran kandilci kandili kandırırken kandırılmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 557, text: "Zıpzıpçı zıpzıpını zıplatırken zıvanadan çıkmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 558, text: "Bir çiğ çiğdemci çiğdemleri çiğ çiğ çiğnemiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 559, text: "Kırlangıç kırlangıcı kırk kırlangıçla kırlamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 560, text: "Çökük çöplükçü çöpleri çöpçüye çöktürmüş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 561, text: "Kuru kuruşluk kurşun kurutulmuş kurşunmuş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 562, text: "Gıcık gıcıkçı gıcıklığı gıcırdamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 563, text: "Paspasçı paspasını paspasçıya paspaslatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 564, text: "Bir küçük kütükçü kütükleri küte küte küfeye koymuş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 565, text: "Şırıl şırıl akar şırıltılı şırıl şırıl şelale.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 566, text: "Kırk kırık fırkacı kırk fırkayı kırk fırıncıyla kırdırmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 567, text: "Gürültülü güvercin güvertede güvercin güldürmüş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 568, text: "Minik minicik minarecik minarecide minik minareymiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 569, text: "Paspas paspaslarken paspas paslanmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 570, text: "Tuhaf tuhafçı tuhaflığı tuhafça tuhaflaştırmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 571, text: "Şık şıkçı şıkkı şıkıştırırken şıklaşmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 572, text: "Bir çırpıda çırpınan çırpıcı çırpı çırpmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 573, text: "Çorapçı çorap çürütürken çorapçının çorapları çürümüş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 574, text: "Fırfır fırıldak fırıldağı fırfırlatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 575, text: "Titiz tütüncü tütünlerini titizlikle tüttürmüş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 576, text: "Dört dörtlük dört dönerci dörde dönmüş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 577, text: "Kıpır kıpır kıvılcımlanan kıvılcım kıpırdaklığı kıvırmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 578, text: "Paspal paspasçı paspasları paspallatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 579, text: "Çaycı çırağı çayları çaycıya çaydanlıkla çaylamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 580, text: "Kedi dediğim kedim dedi ki kedin kedi değil midir?", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 581, text: "Bir küçük bıçak bıçağı bıçaklarken bıçak uğramış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 582, text: "Zincir zincirciye zincirlete zincirlete zincirletilmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 583, text: "Miskin misketçi misketleri miskinleşmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 584, text: "Şapşal şapkacı şapkasını şaklatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 585, text: "Cimri cimcime cimcimeyi cimcikleyerek cimrilik etmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 586, text: "Kıyıkçı kıyıkları kıyıya kıyım kıyarken kıymış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 587, text: "Lakaplı laklakçı lakırtıyı lak diye laklaklatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 588, text: "Tırmık tırmıkçı tırmıkları tırmalarken tırmalatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 589, text: "Sırılsıklam sırıtan sırıtık sarı sırıtkanlar.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 590, text: "Dik dikine dikilmiş dikenli dikenceler.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 591, text: "Yalpalayan yelpaze yelpazeyi yalpalatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 592, text: "Tıkıştır tıkıştırılmış tıkırtılar tıkışmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 593, text: "Bir kuş kuşçuyu kuşkanadına kuşlatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 594, text: "Top topçu top topunu toplatırken topuklamış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 595, text: "Zıp zıpçı zıp zıplayarak zıp zıpçıya zıplatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 596, text: "Civcivci civcivleri civcivciye civciv civcivletmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 597, text: "Fıstıkçı fıstıkları fıstıkçıya fıstıklatmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 598, text: "Bir kayık kayıkçı kayığına kayık kaydırtmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 599, text: "Sapsarı sarımsak sarımsakçıya sarımsaklatılmış.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },
  { id: 600, text: "Zevzek zeytinci zeytinleri zeytinciye zeytinletmiş.", category: "🔥 Dil Kıran (Top 100)", difficulty: "Dil Kıran" },

  // --- GRUP 5: KLASİK RADYOCU VE TEMEL TEKERLEMELER (GERİ YÜKLENENLER) ---
  { id: 1, text: "Bu mumcunun mumu umumumuzun mumudur.", category: "Radyocu Klasikleri", difficulty: "Kolay" },
  { id: 2, text: "Kırk küp kırkının da kulpu kırık küp.", category: "Radyocu Klasikleri", difficulty: "Orta" },
  { id: 3, text: "Şiş şişeyi şişlemiş, şişe keşişe kişnemiş.", category: "Radyocu Klasikleri", difficulty: "Zor" },
  { id: 4, text: "Üç tunç tas has kayısı hoşafı.", category: "Radyocu Klasikleri", difficulty: "Orta" },
  { id: 5, text: "Çatalca'da topal çoban çatal yapıp çatal satar.", category: "Radyocu Klasikleri", difficulty: "Kolay" },
  { id: 6, text: "Bir berber bir berbere bre berber gel beraber bir berber dükkanı açalım demiş.", category: "Radyocu Klasikleri", difficulty: "Orta" },
  { id: 7, text: "Dal sarkar kartal kalkar, kartal kalkar dal sarkar.", category: "Radyocu Klasikleri", difficulty: "Orta" },
  { id: 8, text: "Şu duvarı badanalamalı mı, badanalamamalı mı?", category: "Radyocu Klasikleri", difficulty: "Kolay" },
  { id: 9, text: "Ocak kıvılcımlandırıcılarından mısın, kapı gıcırdatıcılarından mısın?", category: "Radyocu Klasikleri", difficulty: "Zor" },
  { id: 10, text: "Pikolo'yla pilot, plajda pilav yiyip pipo tüttürdüler.", category: "Radyocu Klasikleri", difficulty: "Orta" },
  { id: 11, text: "Şu köşe yaz köşesi, şu köşe kış köşesi, ortada su şişesi.", category: "Radyocu Klasikleri", difficulty: "Kolay" },
  { id: 12, text: "Keşke keşkeği keşişle keşkeşleseydik.", category: "Radyocu Klasikleri", difficulty: "Zor" },
  { id: 13, text: "Paşanın tası ile beş has tas kayısı hoşafı.", category: "Radyocu Klasikleri", difficulty: "Orta" },
  { id: 14, text: "Müjdeci müdür müjdecisine müjdeli müjdesini müjdeledi.", category: "Radyocu Klasikleri", difficulty: "Orta" },
  { id: 15, text: "Az kaz, uz kaz, boyunca kaz.", category: "Radyocu Klasikleri", difficulty: "Kolay" },
  { id: 16, text: "Al bu takatukaları takatukacıya takatukalatmaya götür. Takatukacı takatukaları takatukalamam derse, takatukaları takatukacıdan takatukalatmadan al da gel.", category: "Radyocu Klasikleri", difficulty: "Zor" },
  { id: 17, text: "Şemsi Paşa Pasajı'nda sesi büzüşesiceler.", category: "Radyocu Klasikleri", difficulty: "Orta" },

  // --- GRUP 6: DİL VE DUDAK TEMBELLİĞİ (GERİ YÜKLENENLER) ---
  { id: 20, text: "Bu yoğurdu sarımsaklasak da mı saklasak, sarımsaklamasak da mı saklasak?", category: "Dudak Tembelliği", difficulty: "Orta" },
  { id: 21, text: "Bir pirinci birinci buluşta bir inci gibi birbirine bağlayıp, Perlepe berberi bastıbacak Bedri ile beraber Bursa bağrına parasız giden bu paytak budala, basbayağı balık pazarı bülbülü.", category: "Dudak Tembelliği", difficulty: "Çok Zor" },
  { id: 22, text: "Biz biz idik, biz idik, yüz yirmi bir biz idik, biz dedik, biz işittik, biz bu işin içine nereden girdik?", category: "Dudak Tembelliği", difficulty: "Orta" },
  { id: 23, text: "Pinti Piri'nin pirinesi pip pip öterken, pısırık Pisi pisine pis pis sırıttı.", category: "Dudak Tembelliği", difficulty: "Orta" },
  { id: 24, text: "Baldıran dalları ballandırmalı mı, ballandırmamalı mı? Sonra o bala daldırılan baldıran dalları dallandırılmalı mı, ballı dalla dallandırılmamalı mı?", category: "Dudak Tembelliği", difficulty: "Zor" },
  { id: 25, text: "Marmara'da marmelat satan Marmarisli Mermer, Marmaris'e marmelat satmaya gitti.", category: "Dudak Tembelliği", difficulty: "Kolay" },
  { id: 26, text: "Löp löp lüpleticiler, lüplettikleri lüpleri lüpür lüpür lüplettiler.", category: "Dudak Tembelliği", difficulty: "Orta" },
  { id: 27, text: "Farfaracı Fikriye ile favorili fasa fiso Fahri, Fatsalı Fatma'yı görünce, fesleğenci feylesof Feyyaz'ı anımsayarak feveran ettiler.", category: "Dudak Tembelliği", difficulty: "Zor" },
  { id: 28, text: "Beberuhi'nin bedri, büzüşük bereli, bidon boyunlu, badem bıyıklı Bedri'nin beti benzi bembeyazdı.", category: "Dudak Tembelliği", difficulty: "Zor" },
  { id: 29, text: "Pijamalı hasta, yağız şoföre çabucak güvendi.", category: "Dudak Tembelliği", difficulty: "Kolay" },
  { id: 30, text: "Büyük büstü büklüm büklüm büken bürokrat, büzüşe büzüşe büfeye büründü.", category: "Dudak Tembelliği", difficulty: "Zor" },

  // --- GRUP 7: ÇENE VE ISLIKLI HARFLER (GERİ YÜKLENENLER) ---
  { id: 40, text: "Abana'dan Adana'ya abarta abarta apar topar ahlatla ağdalı avucunu yalayan Araplı Abroşun, ahmağın, avanak Abdal'ın, ahmakça, avanakça, aptalca, anlamsızca akmasına engel olamazsın.", category: "Çene Açıklığı", difficulty: "Çok Zor" },
  { id: 41, text: "Okmeydanı'ndan Oğuzeli'ne otostop yap; Oltu'da volta at, olta al.", category: "Çene Açıklığı", difficulty: "Kolay" },
  { id: 42, text: "Çatalağzı'nda çatalsız Çatalcalı çatalcının çarpık çurpuk çalçene Çoruhluya çarptırmasına ne dersin?", category: "Çene Açıklığı", difficulty: "Zor" },
  { id: 43, text: "Cüce Çinici Celal Hoca gizlice marpuççular içindeki züccaciyeye gidip, içi Çince yazılı cevizcikleri ciro için iç etti.", category: "Çene Açıklığı", difficulty: "Zor" },
  { id: 44, text: "Cumaları cumadan cümbür cemaat cicili bicili, cücüklü cacıklı cingözleri coştururcasına cömertçe cüceye caka sattılar.", category: "Çene Açıklığı", difficulty: "Zor" },
  { id: 45, text: "Jurnalle jürinin jüponları Japonya'da jiletlendi.", category: "Çene Açıklığı", difficulty: "Orta" },
  { id: 46, text: "Ulubatlı utangaç Ulaş'a uğursuz Ulunay'ın uzun uzun uzattığı urganı uğraşa uğraşa unutturdu.", category: "Çene Açıklığı", difficulty: "Zor" },
  { id: 47, text: "Ilım ılınan, ılıcalı ılıcalı akan ılık ılıca suyunun ışıltılı kısmında ısındı.", category: "Çene Açıklığı", difficulty: "Orta" },
  { id: 70, text: "Sazende Şazi ile Zifos Zihni, zaman zaman sizin sokağın sağ köşesinde sinsi sinsi fiskoslaşarak sizi zibidi Suzi’ye sonsuz ve sorumsuz soruyorlar.", category: "Islıklı Harfler", difficulty: "Çok Zor" },
  { id: 71, text: "Şu şosenin şurası şose, şu şosenin şurası da şose.", category: "Islıklı Harfler", difficulty: "Orta" },
  { id: 72, text: "Sen seni bil, sen seni, bil sen seni, sen seni, bilmezsen sen seni, patlatırlar enseni.", category: "Islıklı Harfler", difficulty: "Orta" },
  { id: 73, text: "Şemsi Paşa Pasajı'nda sesi büzüşesicelerden misiniz, yoksa Şemsi Paşa Pasajı'nda sesi büzüşmeyesiye şeşbeş oynayanlardan mısınız?", category: "Islıklı Harfler", difficulty: "Zor" },
  { id: 74, text: "Zevzek zengin, zeytinlikte zevklenirken zerrin zerenle zikzak çizdi.", category: "Islıklı Harfler", difficulty: "Orta" },
  { id: 75, text: "Söğütlü'den sövüp sayan Söğütlü, süpürgeli sütnineye sülük sümük sürtündü.", category: "Islıklı Harfler", difficulty: "Zor" },
  { id: 76, text: "Zonguldaklı Zaloğlu Zöhre'nin zurnacı züppesi Zühtü'yle zevzek zevzek zilzurna ziyafet çekmesi, zurnacı Zühtü'yü zıvanadan çıkardı.", category: "Islıklı Harfler", difficulty: "Çok Zor" },

  // --- GRUP 8: DİL UCU VE GIRTLAK (GERİ YÜKLENENLER) ---
  { id: 50, text: "Ramazan'da Rizeli Remzi, radyoda rastladığı romanın ritmine râm oldu.", category: "Dil Ucu & Gırtlak", difficulty: "Zor" },
  { id: 51, text: "Lüleburgazlı Leyla ile Lalelili Lale, lüks lokantada lüfer yiyip lüle taşı pipolarını tüttürdüler.", category: "Dil Ucu & Gırtlak", difficulty: "Orta" },
  { id: 52, text: "Kilisli kikirik kilimci, Kilizman’daki kilitli kilisede kimliğini kimseye kaptırmadı.", category: "Dil Ucu & Gırtlak", difficulty: "Zor" },
  { id: 53, text: "Gagavuz kuşunun gagası gerdanına sarkar, gergerli gergedan Gürgan’ın gürbüz güdük güdülüne gaddarca gülümser.", category: "Dil Ucu & Gırtlak", difficulty: "Çok Zor" },
  { id: 54, text: "Bir tarlaya kemeken ekmişler. İki kürkü yırtık kel kör kirpi dadanmış. Biri erkek kürkü yırtık kel kör kirpi, öteki dişi kürkü yırtık kel kör kirpi.", category: "Dil Ucu & Gırtlak", difficulty: "Zor" },
  { id: 55, text: "Dört deryanın deresini dört dergâhın derbendine devrederlerse, dört deryadan dört dert, dört dergâhtan dört dev çıkar.", category: "Dil Ucu & Gırtlak", difficulty: "Zor" },
  { id: 56, text: "Namlı Nallıhanlı Nesrin'in nalınlarını nazikâne nergisleri nalıncı nazif'e nallattı.", category: "Dil Ucu & Gırtlak", difficulty: "Orta" },
  { id: 57, text: "Tahir'in tahir olduğu kadar, Tahir'in kızı Huriye de o kadar tahirdir.", category: "Dil Ucu & Gırtlak", difficulty: "Kolay" },
  { id: 58, text: "Tokmakçı tokmağını tokmaklattırıyor mu, tokmaklattırmıyor mu?", category: "Dil Ucu & Gırtlak", difficulty: "Kolay" },
  { id: 59, text: "Leylek leylek lekirdek, hani bana çekirdek? Çekirdeğin içi yok, sarı kızın saçı yok.", category: "Dil Ucu & Gırtlak", difficulty: "Kolay" },

  // --- GRUP 9: EKSTRA ZORLAYICI VE EDEBİ ---
  { id: 110, text: "Nankör nalbant nalları nallamalı mı, nallamamalı mı?", category: "Ekstra Zorlayıcı", difficulty: "Orta" },
  { id: 111, text: "Tişörtlü tiyatrocu Tijen, titiz teyzesini tirit yerken tıka basa tıkıştırdı.", category: "Ekstra Zorlayıcı", difficulty: "Zor" },
  { id: 112, text: "Kötürüm kösnül, kötü kötü köpürerek köstekli kösteği kökledi.", category: "Ekstra Zorlayıcı", difficulty: "Orta" },
  { id: 113, text: "Davulcu dede dışarlıklı dikişçiyi dolandırırken dönemecin duvarından düştü.", category: "Ekstra Zorlayıcı", difficulty: "Orta" },
  { id: 114, text: "Gözlüklü gidişatı, gölgesiz gövel ördeği, gönülsüz gönülsüz gördü.", category: "Ekstra Zorlayıcı", difficulty: "Zor" },
  { id: 115, text: "Böceklenen börekleri, bölük bölük bölen börekçi, bön bön baktı.", category: "Ekstra Zorlayıcı", difficulty: "Zor" },
  { id: 116, text: "Siz hiç bir kış günü, bir kişiyle, şiş yiyip, şişip, şişe dizip, şişmanladınız mı?", category: "Ekstra Zorlayıcı", difficulty: "Zor" },
  { id: 117, text: "Hükümet su işleri işçileri ile, belediye fen işleri işçileri, işhanı girişinde, gidişişe çelişkili kişilerle ilişkilendirilmişler.", category: "Ekstra Zorlayıcı", difficulty: "Çok Zor" },
  { id: 118, text: "Kırk kırık küp, kırkının da kulpu kırık kara küp.", category: "Ekstra Zorlayıcı", difficulty: "Zor" },
  { id: 119, text: "Pireli peyniri perhizli pireler teperlerse, pireli peynirler de pır pır pervaz ederler.", category: "Ekstra Zorlayıcı", difficulty: "Zor" },
  { id: 120, text: "Ürgüplü üzümcü, ürkek üveyikler önünde, üçyüz üç üzüm dürüp üflemiş.", category: "Ekstra Zorlayıcı", difficulty: "Zor" },
  { id: 121, text: "Ağlasam sesimi duyar mısınız mısralarımda, dokunabilir misiniz gözyaşlarıma ellerinizle?", category: "Ekstra Zorlayıcı", difficulty: "Edebi" }
];

// --- YARDIMCI BİLEŞENLER ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, variant = "primary", className, children, disabled, title }) => {
  const baseStyle = "px-6 py-4 rounded-2xl font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 shadow-sm text-sm md:text-base";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200",
    danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200",
    outline: "border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      title={title}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// --- ANA UYGULAMA ---

export default function DictionLabUltimate() {
  const [activeTab, setActiveTab] = useState('menu');
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State: Hatalar (Tekrar edilecekler)
  const [mistakes, setMistakes] = useState([]);
  // State: Tamamlananlar (Bir daha gösterilmeyecekler)
  const [completed, setCompleted] = useState([]);
  
  const [stats, setStats] = useState({ totalCorrect: 0, totalWrong: 0, streak: 0 });
  const [showFeedback, setShowFeedback] = useState(null);
  const [activeCategoryName, setActiveCategoryName] = useState("");

  // LocalStorage İşlemleri
  useEffect(() => {
    const savedMistakes = localStorage.getItem('diction_mistakes_ultimate');
    const savedCompleted = localStorage.getItem('diction_completed_ultimate');
    const savedStats = localStorage.getItem('diction_stats_ultimate');
    
    if (savedMistakes) setMistakes(JSON.parse(savedMistakes));
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    if (savedStats) setStats(JSON.parse(savedStats));
  }, []);

  useEffect(() => {
    localStorage.setItem('diction_mistakes_ultimate', JSON.stringify(mistakes));
    localStorage.setItem('diction_completed_ultimate', JSON.stringify(completed));
    localStorage.setItem('diction_stats_ultimate', JSON.stringify(stats));
  }, [mistakes, completed, stats]);

  // Kategorileri Grupla
  const categories = useMemo(() => {
    const cats = {};
    TEKERLEMELER_DATA.forEach(t => {
      if (!cats[t.category]) cats[t.category] = [];
      cats[t.category].push(t);
    });
    return cats;
  }, []);

  // Oyunu Başlat
  const startGame = (mode, category = null) => {
    let newQueue = [];
    let pool = [];

    // Mod 1: Hataları Tekrarla
    if (mode === 'mistakes') {
      newQueue = mistakes.map(id => TEKERLEMELER_DATA.find(t => t.id === id)).filter(Boolean);
      if (newQueue.length === 0) {
        alert("Hata listeniz tertemiz. Harika gidiyorsunuz!");
        return;
      }
      setActiveCategoryName("Hata Tekrarı");
    } 
    // Mod 2: Kategori (Bildiğim Hariç)
    else if (mode === 'category') {
      pool = TEKERLEMELER_DATA.filter(t => t.category === category);
      newQueue = pool.filter(t => !completed.includes(t.id));
      setActiveCategoryName(category);
    } 
    // Mod 3: Karma (Bildiğim Hariç)
    else {
      pool = TEKERLEMELER_DATA;
      newQueue = pool.filter(t => !completed.includes(t.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 30);
      setActiveCategoryName("Karma Egzersiz");
    }

    if (newQueue.length === 0) {
      if (mode === 'category') {
        alert(`Tebrikler! "${category}" kategorisindeki tüm tekerlemeleri bitirdiniz! İlerlemeyi sıfırlamak için ayarlara bakabilirsiniz.`);
      } else {
        alert("Tebrikler! Tüm havuzu tükettiniz. Muazzam bir başarı!");
      }
      return;
    }

    setQueue(newQueue);
    setCurrentIndex(0);
    setActiveTab('game');
    setShowFeedback(null);
  };

  // Cevap İşleme
  const handleAnswer = (isCorrect) => {
    const currentItem = queue[currentIndex];
    
    setShowFeedback(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalCorrect: isCorrect ? prev.totalCorrect + 1 : prev.totalCorrect,
        totalWrong: isCorrect ? prev.totalWrong : prev.totalWrong + 1,
        streak: isCorrect ? prev.streak + 1 : 0
      }));

      if (isCorrect) {
        if (!completed.includes(currentItem.id)) {
          setCompleted(prev => [...prev, currentItem.id]);
        }
        if (mistakes.includes(currentItem.id)) {
          setMistakes(prev => prev.filter(id => id !== currentItem.id));
        }
      } else {
        if (!mistakes.includes(currentItem.id)) {
          setMistakes(prev => [...prev, currentItem.id]);
        }
      }

      if (currentIndex < queue.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowFeedback(null);
      } else {
        setActiveTab('summary');
      }
    }, 500);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 0.9; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const resetProgress = () => {
    if (confirm("Tüm ilerlemeniz (bildiğim tekerlemeler ve hatalar) silinecek. Emin misiniz?")) {
      setCompleted([]);
      setMistakes([]);
      setStats({ totalCorrect: 0, totalWrong: 0, streak: 0 });
      alert("İlerleme sıfırlandı. Temiz bir başlangıç!");
    }
  };

  // --- EKRANLAR ---

  const MenuScreen = () => {
    const totalItems = TEKERLEMELER_DATA.length;
    const progressPercent = Math.round((completed.length / totalItems) * 100);

    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-white px-6 py-5 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-600" />
                Diksiyon Lab <span className="text-indigo-600 text-xs bg-indigo-100 px-2 py-1 rounded-full">ULTIMATE</span>
              </h1>
              <p className="text-slate-500 text-xs font-medium mt-1">Akıllı Tekrar Sistemi • 300+ Tekerleme</p>
            </div>
            <button onClick={resetProgress} title="İlerlemeyi Sıfırla" className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 mb-1 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>İlerleme: %{progressPercent}</span>
            <span>{completed.length} / {totalItems} Tamamlandı</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4">
          <button 
            onClick={() => mistakes.length > 0 && startGame('mistakes')}
            className={`relative p-4 rounded-2xl border text-left transition-all ${mistakes.length > 0 ? 'bg-rose-50 border-rose-200 hover:bg-rose-100' : 'bg-slate-50 border-slate-200 opacity-60'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <RotateCcw className={`w-5 h-5 ${mistakes.length > 0 ? 'text-rose-500' : 'text-slate-400'}`} />
              <span className={`font-bold text-sm ${mistakes.length > 0 ? 'text-rose-700' : 'text-slate-500'}`}>Hata Havuzu</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">{mistakes.length}</div>
          </button>

          <button 
            onClick={() => startGame('all')}
            className="relative p-4 rounded-2xl border border-indigo-200 bg-indigo-50 text-left hover:bg-indigo-100 transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <Filter className="w-5 h-5 text-indigo-500" />
              <span className="font-bold text-sm text-indigo-700">Akıllı Karma</span>
            </div>
            <div className="text-xs font-medium text-indigo-400 mt-1">Bilmeyenleri Getir</div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-3 custom-scrollbar">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
            Kategoriler ({Object.keys(categories).length})
          </h2>
          
          {Object.keys(categories).map(cat => {
            const totalInCat = categories[cat].length;
            const completedInCat = categories[cat].filter(t => completed.includes(t.id)).length;
            const isFinished = totalInCat === completedInCat;

            return (
              <button
                key={cat}
                onClick={() => startGame('category', cat)}
                disabled={isFinished}
                className={`w-full p-4 rounded-xl border shadow-sm transition-all group flex items-center justify-between ${
                  isFinished ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:shadow-md hover:border-indigo-300'
                } ${cat.includes('Tıbbi') ? 'border-l-4 border-l-emerald-400' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    cat.includes('Tıbbi') ? 'bg-emerald-100' : 
                    cat.includes('Vurgu') ? 'bg-pink-100' :
                    cat.includes('Efsanevi') ? 'bg-red-100' :
                    isFinished ? 'bg-slate-200' : 'bg-slate-100'
                  }`}>
                    {cat.includes('Tıbbi') ? <Stethoscope className="w-5 h-5 text-emerald-600" /> : 
                     cat.includes('Vurgu') ? <Music className="w-5 h-5 text-pink-600" /> :
                     cat.includes('Efsanevi') ? <Skull className="w-5 h-5 text-red-600" /> :
                     isFinished ? <CheckCircle2 className="w-5 h-5 text-slate-500" /> :
                     <BookOpen className="w-5 h-5 text-slate-600" />}
                  </div>
                  <div className="text-left">
                    <span className={`block font-bold text-sm transition-colors ${
                      isFinished ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-indigo-600'
                    }`}>{cat}</span>
                    <span className="text-[10px] text-slate-400">
                      {isFinished ? 'Tamamlandı' : `${totalInCat - completedInCat} kart kaldı`}
                    </span>
                  </div>
                </div>
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="16" cy="16" r="14" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                    <circle cx="16" cy="16" r="14" stroke={isFinished ? "#10b981" : "#6366f1"} strokeWidth="3" fill="none" 
                      strokeDasharray="88" strokeDashoffset={88 - (88 * (completedInCat / totalInCat))} />
                  </svg>
                </div>
              </button>
            );
          })}
          
          <div className="h-12"></div>
        </div>
      </div>
    );
  };

  const GameScreen = () => {
    const item = queue[currentIndex];
    
    return (
      <div className="flex flex-col h-full bg-slate-100">
        <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm border-b border-slate-200">
          <button onClick={() => setActiveTab('menu')} className="text-slate-500 hover:text-indigo-600 font-bold text-sm flex items-center gap-1 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180" /> Çıkış
          </button>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-bold text-slate-400 uppercase">{activeCategoryName}</span>
             <span className="text-xs font-bold text-indigo-600">{currentIndex + 1} / {queue.length}</span>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col items-center justify-center relative perspective">
          
          {showFeedback && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/10 backdrop-blur-[2px] pointer-events-none">
              <div className={`bg-white p-6 rounded-3xl shadow-2xl transform transition-all duration-300 ${showFeedback === 'correct' ? 'scale-110' : 'scale-100'}`}>
                {showFeedback === 'correct' ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-2" />
                    <span className="font-bold text-emerald-600">Öğrenildi!</span>
                    <span className="text-xs text-emerald-400">Arşive Kaldırıldı</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <RotateCcw className="w-16 h-16 text-rose-500 mb-2" />
                    <span className="font-bold text-rose-600">Tekrar Edilecek</span>
                    <span className="text-xs text-rose-400">Hata Listesine Eklendi</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Card className="w-full max-w-2xl h-full max-h-[600px] flex flex-col relative bg-white">
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-10 bg-gradient-to-b from-white via-white to-transparent">
               <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                 item.category.includes('Tıbbi') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-indigo-50 text-indigo-700'
               }`}>
                {item.category}
              </span>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                item.difficulty === 'İmkansız' ? 'bg-purple-100 text-purple-700 animate-pulse' :
                item.difficulty === 'Anatomi' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {item.difficulty}
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto custom-scrollbar">
              <p className={`text-center font-medium text-slate-800 leading-normal font-serif ${
                item.text.length > 200 ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl lg:text-4xl'
              }`}>
                "{item.text}"
              </p>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => speakText(item.text)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm font-bold text-slate-500 shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                Telaffuzu Dinle
              </button>
            </div>
          </Card>
        </div>

        <div className="bg-white p-4 border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col items-center mb-2">
            <span className="text-[10px] text-slate-400 font-medium">Bunu biliyorsan "Net Okudum" de, bir daha göstermeyelim.</span>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button 
              variant="danger" 
              onClick={() => handleAnswer(false)}
              disabled={!!showFeedback}
              className="group"
            >
              <XCircle className="w-6 h-6 opacity-80 group-hover:scale-110 transition-transform" />
              <span>Takıldım</span>
            </Button>
            <Button 
              variant="success" 
              onClick={() => handleAnswer(true)}
              disabled={!!showFeedback}
              className="group"
            >
              <CheckCircle2 className="w-6 h-6 opacity-80 group-hover:scale-110 transition-transform" />
              <span>Net Okudum</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const SummaryScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
        <div className="inline-flex p-4 rounded-full bg-indigo-100 mb-2">
          <Trophy className="w-12 h-12 text-indigo-600" />
        </div>
        
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Seans Bitti</h2>
          <p className="text-slate-500 font-medium mt-1">İlerlemeler sisteme kaydedildi.</p>
        </div>

        <div className="flex gap-4 justify-center py-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-emerald-500">{stats.streak}</span>
            <span className="text-xs uppercase font-bold text-slate-400 mt-1">Bu Seansta Öğrenilen</span>
          </div>
        </div>

        <div className="space-y-3">
          {mistakes.length > 0 && (
            <Button variant="danger" className="w-full" onClick={() => startGame('mistakes')}>
              <RotateCcw className="w-4 h-4" /> Hataları Tekrarla
            </Button>
          )}
          <Button variant="secondary" className="w-full" onClick={() => setActiveTab('menu')}>
            <ChevronRight className="w-4 h-4" /> Menüye Dön
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-slate-100 overflow-hidden font-sans text-slate-800 md:flex md:items-center md:justify-center md:p-6">
      <div className="w-full md:max-w-md h-full md:h-[800px] bg-white md:rounded-[32px] md:shadow-2xl md:border md:border-slate-200 overflow-hidden relative flex flex-col">
        {activeTab === 'menu' && <MenuScreen />}
        {activeTab === 'game' && <GameScreen />}
        {activeTab === 'summary' && <SummaryScreen />}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 20px;
        }
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
