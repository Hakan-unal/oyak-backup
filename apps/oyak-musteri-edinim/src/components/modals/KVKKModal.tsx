import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import Button from '../core/Button';
import { resetInActiveTimeEvent } from '@utils/event.util';

type Props = Omit<ModalProps, 'children'>;

const KVKKModal: React.FC<Props> = (props) => (
  <Modal {...props}>
    <ModalOverlay />
    <ModalContent onClick={resetInActiveTimeEvent}>
      <ModalHeader>
        <Heading size='lg'>
          6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
          Bilgilendirme
        </Heading>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody maxH='96' overflowY='auto'>
        <VStack align='start'>
          <Text>
            OYAK Yatırım Menkul Değerler A.Ş.’nin (OYAK Yatırım) değerli bir
            müşterisi olarak size, 6698 sayılı Kişisel Verilerin Korunması
            Kanunu (“KVKK”) kapsamında, veri sorumlusu olarak aydınlatma
            yükümlülüğünü yerine getirmek üzere işbu bilgilendirmeyi
            yapmaktayız.
          </Text>
          <Text>
            6698 Sayılı Kanun kapsamında, “Kişisel Veri”; OYAK Yatırım - Müşteri
            ilişkisi çerçevesinde tarafınızca iletilen veya ilgili kamu ve özel
            kurumları kapsayacak şekilde üçüncü kişilerden edinilen bilgileriniz
            dâhil kimlik bilgilerinizi, iletişim bilgilerinizi, müşteri sözleşme
            ve hesabınzda yer alan tüm bilgileri, iletmiş olduğunuz tüm
            bilgileri, otomatik ya da otomatik olmayan yöntemlerle, internet
            sitesi, mobil uygulamalar ve benzeri araçlarla OYAK Yatırım bilgi
            teknolojisi ve iletişim sistemlerinde kullanılan yazılı, sözlü,
            sesli, görüntülü veya elektronik ortamda elde edilen ve/veya tutulan
            tüm bilgileri ve Kanunen yükümlülüklerimizi yerine getirebilmemiz
            için gerekli olan bilgileriniz, varsa hukuki işlemler, Şirketimizde
            mevcut olan hak ve alacaklarınız ile ilgili olarak kamu kurumları
            veya yargı organları tarafından gönderilen bilgilerinizi de kapsayan
            özel nitelikli kişisel verileriniz dâhil tüm bilgileri ifade eder.
          </Text>
          <Text>
            OYAK Yatırım, 6698 Sayılı Kanun’da tanımlandığı şekli ile “Veri
            Sorumlusu” sıfatını haizdir. Kişisel Verileriniz 6362 Sayılı Sermaye
            Piyasası Kanunu ve diğer mevzuat çerçevesinde müşteri ilişkisinden
            doğan yasal yükümlülüklerin yerine getirebilmesi için zorunlu olarak
            ve sizlerle iletişim sağlanarak bilgi verilebilmesi, OYAK Yatırım
            tarafından sunulan hizmetlerden sizleri faydalandırmak, bu
            hizmetleri en üst standartlarda müşteri memnuniyetini gözeterek
            yerine getirmek, OYAK Yatırım iştirakleri ve Ordu Yardımlaşma Kurumu
            Grup Şirketleri tarafından sunulan ürün ve hizmetlerden
            faydalanmanızı sağlamak amacıyla KVKK’nın 5 ve 6. maddelerinde
            belirtilen şartlarla işlenmekte, kaydedilmekte, depolanmakta,
            muhafaza edilmekte, gerektiğinde güncellenmekte ve
            aktarılabilmektedir. OYAK Yatırım, kişisel verilerinizi, kayıplara,
            değişimlere, bilgisayar ağı üzerinden veri aktarımları sırasında
            oluşabilecek kanuna aykırı tüm yetkisiz kullanımlara ve erişimlere
            ve diğer şekillerde olan işlemlere ve kötüye kullanmalara karşı
            korumak için makul teknik önlemleri almaktadır.
          </Text>
          <Text>
            Bu bilgilendirme metni kapsamında işlenen kişisel verileriniz, 6362
            Sayılı Sermaye Piyasası Kanunu ve diğer mevzuat çerçevesinde, hukuka
            ve dürüstlük kurallarına uygun ve yukarıda belirtilen amaçlarla
            bağlantılı, sınırlı ve ölçülü olarak, KVKK’nın 8. ve 9. maddeleri
            çerçevesinde; Sermaye Piyasası Kurulu, Mali Suçları Araştırma
            Kurulu, Borsa İstanbul A.Ş., Merkezi Kayıt Kuruluşu A.Ş., İstanbul
            Takas ve Saklama Bankası A.Ş., OYAK Yatırım iştirakleri, Ordu
            Yardımlaşma Kurumu Grubu kuruluşları ile hukuken yetkili olan adli
            ve idari makamlarla, kamu kurum ve kuruluşlarıyla, banka ve bağımsız
            denetim şirketi gibi hukuken yetkilendirilmiş olan gerçek ve tüzel
            kişilerle ve benzeri hizmetler aldığımız kişi ve kurumlarla
            paylaşılabilecektir.
          </Text>
          <Text>
            Bu bilgilendirme metni kapsamında işlenen kişisel verileriniz, 6362
            Sayılı Sermaye Piyasası Kanunu ve diğer mevzuat çerçevesinde, hukuka
            ve dürüstlük kurallarına uygun ve yukarıda belirtilen amaçlarla
            bağlantılı, sınırlı ve ölçülü olarak, KVKK’nın 8. ve 9. maddeleri
            çerçevesinde; Sermaye Piyasası Kurulu, Mali Suçları Araştırma
            Kurulu, Borsa İstanbul A.Ş., Merkezi Kayıt Kuruluşu A.Ş., İstanbul
            Takas ve Saklama Bankası A.Ş., OYAK Yatırım iştirakleri, Ordu
            Yardımlaşma Kurumu Grubu kuruluşları ile hukuken yetkili olan adli
            ve idari makamlarla, kamu kurum ve kuruluşlarıyla, banka ve bağımsız
            denetim şirketi gibi hukuken yetkilendirilmiş olan gerçek ve tüzel
            kişilerle ve benzeri hizmetler aldığımız kişi ve kurumlarla
            paylaşılabilecektir.
          </Text>
          <Text>Saygılarımızla,</Text>
          <Heading size='md'>Oyak Yatırım Menkul Değerler A.Ş.</Heading>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button label='Kapat' onClick={props.onClose} variant='secondary' />
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default KVKKModal;
