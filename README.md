### Photo Locations

#### Install

##### install global dependencies

1 . https://yarnpkg.com/lang/en/docs/install/

2 . react-native:
```
$ yarn global add react-native
```
3 . git
```
$ sudo apt-get install git
```
4 . oracle java
```
$ sudo add-apt-repository ppa:webupd8team/java
$ sudo apt-get update
$ sudo apt-get install oracle-java8-installer
```
5 . nvm node
https://github.com/creationix/nvm
```
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
$ command -v nvm
$ nvm install 9.5
```
6 . virtualbox
https://www.virtualbox.org/wiki/Linux_Downloads
```
$ sudo vi /etc/apt/sources.list
$ deb http://download.virtualbox.org/virtualbox/debian xenial contrib
$ wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | sudo apt-key add -
$ sudo apt-get update
$ sudo apt-get install virtualbox-5.2
```

7 . android studio
http://facebook.github.io/react-native/docs/getting-started.html

#### command to avoid ENOSPC
```
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

#### project depencencies
```
$ yarn
```

#### Tools

##### Standalone RN Debugger

https://github.com/jhen0409/react-native-debugger

##### Genimotion android emulator (vbox based)

https://www.genymotion.com/download/  (has registration/login step)
```
$ chmod +x genymotion-2.12.1-linux_x64.bin
```


#### Run js bundler for development

```
$ yarn run start
```

#### Run debug version on Android

```
$ yarn run android
```

#### Build android release app

1 . (once) prepare keys, follow http://facebook.github.io/react-native/docs/signed-apk-android.html

2 . start build

```
$ cd android && ./gradlew assembleRelease
```

3 . find `./android/app/build/outputs/apk/release/LMLegoFront-[year-month-day-hour-minute].apk`

#### Run on Mac

use XCODE

