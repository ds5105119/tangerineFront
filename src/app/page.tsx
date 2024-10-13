import TopMainNav from '@/components/navBar/top-main-nav';
import TopBasicNav from '@/components/navBar/top-basic-nav';
import TopSearchNav from '@/components/navBar/top-search-nav';
import TopUploadNav from '@/components/navBar/top-upload-nav';
import RoundButton from '@/components/button/roundButton';
import Button from '@/components/button/button';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-auto space-y-10 items-center sm:items-start">
      <TopMainNav>이별 =(눈물+슬픔)²/(술×담배연기)⁴-(사랑+약속+추억)+(미움+물거품+잿빛하늘)</TopMainNav>
      <TopBasicNav></TopBasicNav>
      <TopSearchNav></TopSearchNav>
      <TopUploadNav></TopUploadNav>
      <RoundButton intent={'active'}>발동</RoundButton>
      <RoundButton intent={'outline'}>발동</RoundButton>
      <RoundButton intent={'disabled'}>발동</RoundButton>
      <Button intent={'default'} colorScheme={'default'}>
        안녕
      </Button>
      <Button intent={'default'} colorScheme={'indigo'}>
        안녕
      </Button>
      <Button intent={'default'} colorScheme={'blue'}>
        안녕
      </Button>
      <Button intent={'outline'} colorScheme={'default'}>
        안녕
      </Button>
      <Button intent={'outline'} colorScheme={'indigo'}>
        안녕
      </Button>
      <Button intent={'outline'} colorScheme={'blue'}>
        안녕
      </Button>
      <Button intent={'disabled'} colorScheme={'default'}>
        안녕
      </Button>
      <Button intent={'disabled'} colorScheme={'indigo'}>
        안녕
      </Button>
      <Button intent={'disabled'} colorScheme={'blue'}>
        안녕
      </Button>
    </main>
  );
}
