<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#steam" style="color: #007bff; text-decoration: none; margin: 0 10px;">👨‍💻 Features </a>
</div>

<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🚀 Space Multiplayer</h2>
        <p>
            A fast-paced multiplayer space shooter developed in Unity under strict constraints: 
            1-week timeline, ENET6 networking library, and multiplayer implementation. Features 
            real-time ship combat, customizable skins, and dynamic leaderboards.
        </p>
        <div style="background: #1a1a1a; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
            <span style="font-weight: bold; color: #007bff;">Key Challenges:</span>
            <ul>
                <li>Networked physics synchronization</li>
                <li>Lag-compensated shooting mechanics</li>
                <li>Dynamic leaderboard updates</li>
                <li>Client prediction and reconciliation</li>
            </ul>
        </div>
    </div>
    <img src="https://i.imgur.com/HqrZtYh.png" 
         alt="Gameplay Screenshot" 
         style="width: 50%; border-radius: 8px; margin-left: 20px;">
</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            Space Multiplayer is a end of course project where we had to develope a multiplayer game in one week. The constrains were that we had to use Enet6 and any engine of our choice. We deceided to make a simple space shooter with a leaderboard, skins and name.
        </p>
        <p>
            <span style ="font-weight: bold;"> Challenges : </span>
            - client movement synchronisation
        </p>
    </div>
    <img src="https://i.imgur.com/HqrZtYh.png" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>

<div style="display: flex; justify-content: space-between; margin-top: 20px; gap: 15px;">
            <div style="flex: 1; min-width: 0;"> <!-- Fix for flexbox overflow -->
                <img src="https://media.discordapp.net/attachments/1347326761993769041/1347326784995332117/Design_sans_titre.jpg?ex=67cb6b59&is=67ca19d9&hm=4b9b0b6e22d35f62f34fd3b6bcd7c682e16f3db96664b8bdad40d8f5984bd3bf&=&format=webp&width=926&height=521" 
                     alt="Featured Concept Art" 
                     style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
            </div>
            <div style="flex: 1; min-width: 0;">
                <img src="https://media.discordapp.net/attachments/1347326761993769041/1347326784995332117/Design_sans_titre.jpg?ex=67cb6b59&is=67ca19d9&hm=4b9b0b6e22d35f62f34fd3b6bcd7c682e16f3db96664b8bdad40d8f5984bd3bf&=&format=webp&width=926&height=521" 
                     alt="Featured Concept Art" 
                     style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
            </div>
            <div style="flex: 1; min-width: 0;">
                <img src="https://media.discordapp.net/attachments/1347326761993769041/1347326784995332117/Design_sans_titre.jpg?ex=67cb6b59&is=67ca19d9&hm=4b9b0b6e22d35f62f34fd3b6bcd7c682e16f3db96664b8bdad40d8f5984bd3bf&=&format=webp&width=926&height=521" 
                     alt="Featured Concept Art" 
                     style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
            </div>
        </div>
        <!-- Adding text under the images -->
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
            <div style="width: 30%; margin: 0 5px; color: #fff;">
                <p>THIS IS TEXT</p>
            </div>
            <div style="width: 30%; margin: 0 5px; color: #fff;">
                <p>THIS IS TEXT</p>
            </div>
            <div style="width: 30%; margin: 0 5px; color: #fff;">
                <p>THIS IS TEXT</p>
            </div>
        </div>
</div>

<!-- Main Content with Anchor -->
<div id="steam" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👨‍💻 Steamworks Integration</h2>
        <ul style="font-size: 120%;">
        <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Player Connection</span>
                <p>
                    Each player when launching the game create a friends only lobby. Then when the player join a lobby it create or join the steam socket server based on who is the host. The host's SteamId is used as the "key" to connect to the socket server;
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            OnLobbyEntered(Lobby lobby)
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    private void OnLobbyEntered(Lobby lobby)
    {
        "Lobby Entered".Log();
        if (connectionManager != null)
        {
            connectionManager.Close();
        }

        if (socketManager != null)
        {
            socketManager.Close();
        }

        currentLobby = lobby;

        if (lobby.Owner.Id == SteamClient.SteamId)
        {
            socketManager = SteamNetworkingSockets.CreateRelaySocket(0, server);
            server.ResetPlayers();
        }
        connectionManager = SteamNetworkingSockets.ConnectRelay(lobby.Owner.Id, 0, client);
    }

</div>
                </details>
            </li>
            <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Lobbies</span>
                <p>
                    I used Facepunch API to make lobbies when needed, such as when a friend sends an invite or when you want to join a public lobby.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            CreateFriendLobbyAsync()
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public async void CreateFriendLobbyAsync()
    {
        try
        {
            var createLobbyResult = await SteamMatchmaking.CreateLobbyAsync(maxPlayer);
            if (createLobbyResult.HasValue)
            {
                currentLobby = createLobbyResult.Value;

                currentLobby.SetFriendsOnly();
                currentLobby.SetJoinable(true);
            }
            else
            {
                Debug.LogError("Failed to create lobby.");
            }
        }
        catch (System.Exception ex)
        {
            Debug.LogError($"Error creating lobby: {ex.Message}");
        }
    }

</div>
                </details>
            </li>
            <li style= "padding-bottom: 15px">
    <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Socket Server</span>
    <p>
        This class handles the server-side logic that manage player connections, player data, and game states using Steamworks networking. It implements the `ISocketManager` interface to handle events like connecting, disconnecting, and receiving messages.
    </p>
    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            SteamSocketServer.cs
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CreateAssetMenu(fileName = "SteamSocketServer", menuName = "ScriptableObjects/SteamSocketServer", order = 1)]
    public class SteamSocketServer : ScriptableObject, ISocketManager
    {
        [SerializeField] float waitBeforeStart = 3f;
        static int globalPlayerCount = 0;
        Awaitable waitBegin = null;

        static Dictionary&lt;Connection, PlayerData&gt; players = new();

        public void ResetPlayers()
        {
            players.Clear();
        }

        public void OnConnecting(Connection connection, ConnectionInfo info)
        {
            connection.Accept();
            "Client Try To Connect".Log();
        }

        public void OnConnected(Connection connection, ConnectionInfo info)
        {
            "Client is Connected".Log();

            PlayerData playerData = new PlayerData();
            playerData.connection = connection;
            playerData.steamId = info.Identity.SteamId;
            playerData.playerNum = globalPlayerCount;
            players.Add(connection, playerData);
            globalPlayerCount++;

            if (players.Count != SteamManager.instance.maxPlayer) return;

            globalPlayerCount = 0;
            bigGrid = new();
            bigGrid.Clear();
            for (int i = 0; i < 9; i++)
            {
                bigGrid.Add(new SmallGrid());
            }
            waitForAllType = true;

            foreach (var player in players.Keys)
            {
                PacketBuilder.SendPacket(new LoadScene(2), player, SendType.Reliable);
            }
        }

        public void OnDisconnected(Connection connection, ConnectionInfo info)
        {
            connection.Close();
            "Client Disconnected".Log();
        }

        public void OnMessage(Connection connection, NetIdentity identity, IntPtr data, int size, long messageNum, long recvTime, int channel)
        {
            "Server Receive Packet".Log();
            byte[] byteArray = new byte[size];
            Marshal.Copy(data, byteArray, 0, size);
            int offset = 0;
            Opcode opcode = (Opcode)Serialization.DeserializeU16(byteArray, ref offset);
            switch (opcode)
            {
                case Opcode.Message:
                    {
                        MessagePacket packet = MessagePacket.Deserialize<MessagePacket>(byteArray, ref offset);
                        packet.messsage.Log();
                        break;
                    }
                case Opcode.Ready:
                    {
                        if (players.TryGetValue(connection, out PlayerData player))
                        {
                            player.isReady = true;
                            foreach (var playerConnection in players.Keys)
                            {
                                PacketBuilder.SendPacket(new Ready(player.playerNum), playerConnection, SendType.Reliable);
                            }
                        }
                        CheckToStart();
                        break;
                    }
                case Opcode.CancelReady:
                    {
                        if (players.TryGetValue(connection, out PlayerData player))
                        {
                            player.isReady = false;
                            foreach (var playerConnection in players.Keys)
                            {
                                PacketBuilder.SendPacket(new CancelReady(player.playerNum), playerConnection, SendType.Reliable);
                            }
                            CheckToStart();
                        }
                        break;
                    }
                case Opcode.Play:
                    {
                        if (players.TryGetValue(connection, out PlayerData player))
                        {
                            PlayClient playTurnPacket = PlayClient.Deserialize&lt;PlayClient&gt;(byteArray, ref offset);
                            HandleTurnPakcet(player, playTurnPacket.pos, playTurnPacket.bigPos);
                        }
                        break;
                    }
            }
        }
    }
</div>
        </div>
    </details>
</li>
<li style= "padding-bottom: 15px">
    <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Socket Client</span>
    <p>
        This class handles the client-side logic that send the player's inputs to the server and listen to the server packets. The server's message is send to the reacting GameObject by using C# events that sends the packets data. It implements the `IConnectionManager` interface to handle events like connecting, disconnecting, and receiving messages from the server.
    </p>
    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            SteamSocketClient.cs
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CreateAssetMenu(fileName = "SteamSocketClient", menuName = "ScriptableObjects/SteamSocketClient", order = 1)]
    public class SteamSocketClient : ScriptableObject, IConnectionManager
    {
        public int firstTurn = -1;
        public int playerNum = 0;

        public event Action<int, int, int> playTurn;
        public event Action activateAll;
        public event Action<int> activateSpecified;
        public event Action<int, int> smallWin;
        public event Action<int, float,float> timeUpdate;

        public void OnConnected(ConnectionInfo info)
        {

        }

        public void OnConnecting(ConnectionInfo info)
        {

        }

        public void OnDisconnected(ConnectionInfo info)
        {

        }

        public void OnMessage(IntPtr data, int size, long messageNum, long recvTime, int channel)
        {
            byte[] byteArray = new byte[size];
            Marshal.Copy(data, byteArray, 0, size);
            int offset = 0;
            Opcode opcode = (Opcode)Serialization.DeserializeU16(byteArray, ref offset);
            switch (opcode)
            {
                case Opcode.Message:
                    MessagePacket messagePacket = MessagePacket.Deserialize<MessagePacket>(byteArray, ref offset);
                    messagePacket.messsage.Log();
                    break;
                case Opcode.LoadScene:
                    LoadScene loadScenepacket = LoadScene.Deserialize<LoadScene>(byteArray, ref offset);
                    SceneManager.LoadScene(loadScenepacket.scene);
                    break;
                case Opcode.Ready:
                    Ready readypacket = Ready.Deserialize<Ready>(byteArray, ref offset);
                    SteamManager.instance.Ready(readypacket.playerNum);
                    break;
                case Opcode.CancelReady:
                    CancelReady cancelReadypacket = CancelReady.Deserialize<CancelReady>(byteArray, ref offset);
                    SteamManager.instance.CancelReady(cancelReadypacket.playerNum);
                    break;
                case Opcode.InitGame:
                    InitGame initGame = InitGame.Deserialize<InitGame>(byteArray, ref offset);
                    firstTurn = initGame.firstTurn;
                    playerNum = initGame.playerNum;
                    SceneManager.LoadScene(1);
                    break;
                case Opcode.PlayTurn:
                    PlayTurn playTurnPacket = PlayTurn.Deserialize<PlayTurn>(byteArray, ref offset);
                    playTurn?.Invoke(playTurnPacket.playerNum, playTurnPacket.posBig, playTurnPacket.posSmall);
                    timeUpdate?.Invoke(playTurnPacket.playerNum,playTurnPacket.time0,playTurnPacket.time1);
                    break;
                case Opcode.ActivateAll:
                    activateAll?.Invoke();
                    break;
                case Opcode.ActivateSpe:
                    ActivateSpecified activateSpecifiedPacket = ActivateSpecified.Deserialize<ActivateSpecified>(byteArray, ref offset);
                    activateSpecified?.Invoke(activateSpecifiedPacket.pos);
                    break;
                case Opcode.SmallWin:
                    SmallWin smallWinPacket = SmallWin.Deserialize<SmallWin>(byteArray, ref offset);
                    smallWin?.Invoke(smallWinPacket.bigPos, smallWinPacket.playerNum);
                    break;


            }
        }
    }
</div>
        </div>
    </details>
</li>

<p style="background:rgb(26, 26, 26); padding: 0.5rem; margin-bottom: 1rem; border-radius: 2px; text-align: center;" >
        I used <span style="color: #007bff"> Scriptable Objects</span> for the client and the server setup because I could have a reference to these objects whitout being scene dependant. I was inspired by SOAP a unity asset that makes game architecture easier.
    </p>
            <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold; font-size: 120%">Data Serialization</span>
                <p>
                    I created a static class with functiun to serialize and deserialize types such as bytes, ushort, short, uint, int, float, Quaternions, Vectors and Color.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            Serialization.cs
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public static class Serialization
    {
        public static void SerializeColor(List<byte> byteArray, Color value)
        {
            SerializeU8(byteArray, (byte)(value.r));
            SerializeU8(byteArray, (byte)(value.g));
            SerializeU8(byteArray, (byte)(value.b));
            SerializeU8(byteArray, (byte)(value.a));
        }

        public static Color DeserializeColor(byte[] byteArray, ref int offset)
        {
            byte r = DeserializeU8(byteArray, ref offset);
            byte g = DeserializeU8(byteArray, ref offset);
            byte b = DeserializeU8(byteArray, ref offset);
            byte a = DeserializeU8(byteArray, ref offset);

            return new Color(r, g, b, a);
        }

        public static void SerializeVector3(List<byte> byteArray, Vector3 value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
            SerializeF32(byteArray, value.z);
        }

        public static Vector3 DeserializeVector3(byte[] byteArray, ref int offset)
        {
            Vector3 result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            result.z = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeVector2(List<byte> byteArray, Vector2 value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
        }

        public static Vector2 DeserializeVector2(byte[] byteArray, ref int offset)
        {
            Vector2 result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeQuaternion(List<byte> byteArray, Quaternion value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
            SerializeF32(byteArray, value.z);
            SerializeF32(byteArray, value.w);
        }

        public static Quaternion DeserializeQuaternion(byte[] byteArray, ref int offset)
        {
            Quaternion result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            result.z = DeserializeF32(byteArray, ref offset);
            result.w = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeF32(List<byte> byteArray, float value)
        {
            int intRepresentation = BitConverter.ToInt32(BitConverter.GetBytes(value), 0);
            SerializeI32(byteArray, intRepresentation);
        }

        public static float DeserializeF32(byte[] byteArray, ref int offset)
        {
            int intRepresentation = DeserializeI32(byteArray, ref offset);
            return BitConverter.ToSingle(BitConverter.GetBytes(intRepresentation), 0);
        }

        public static void SerializeI8(List<byte> byteArray, sbyte value)
        {
            SerializeU8(byteArray, (byte)value);
        }

        public static sbyte DeserializeI8(byte[] byteArray, ref int offset)
        {
            return (sbyte)DeserializeU8(byteArray, ref offset);
        }

        public static void SerializeI16(List<byte> byteArray, short value)
        {
            SerializeU16(byteArray, (ushort)value);
        }

        public static short DeserializeI16(byte[] byteArray, ref int offset)
        {
            short value = BitConverter.ToInt16(byteArray, offset);
            offset += sizeof(short);
            return IPAddress.NetworkToHostOrder(value);
        }

        public static void SerializeI32(List<byte> byteArray, int value)
        {
            SerializeU32(byteArray, (uint)value);
        }

        public static int DeserializeI32(byte[] byteArray, ref int offset)
        {
            int value = BitConverter.ToInt32(byteArray, offset);
            offset += sizeof(int);
            return IPAddress.NetworkToHostOrder(value);
        }

        public static void SerializeU8(List<byte> byteArray, byte value)
        {
            byteArray.Add(value);
        }

        public static byte DeserializeU8(byte[] byteArray, ref int offset)
        {
            byte value = byteArray[offset];
            offset += sizeof(byte);
            return value;
        }

        public static void SerializeU16(List<byte> byteArray, ushort value)
        {
            value = (ushort)IPAddress.HostToNetworkOrder((short)value);
            byteArray.AddRange(BitConverter.GetBytes(value));
        }

        public static ushort DeserializeU16(byte[] byteArray, ref int offset)
        {
            ushort value = BitConverter.ToUInt16(byteArray, offset);
            offset += sizeof(ushort);
            return (ushort)IPAddress.NetworkToHostOrder((short)value);
        }

        public static void SerializeU32(List<byte> byteArray, uint value)
        {
            value = (uint)IPAddress.HostToNetworkOrder((int)value);
            byteArray.AddRange(BitConverter.GetBytes(value));
        }

        public static uint DeserializeU32(byte[] byteArray, ref int offset)
        {
            uint value = BitConverter.ToUInt32(byteArray, offset);
            offset += sizeof(uint);
            return (uint)IPAddress.NetworkToHostOrder((int)value);
        }

        public static void SerializeString(List<byte> byteArray, string value)
        {
            SerializeU32(byteArray, (uint)value.Length);
            byteArray.AddRange(Encoding.UTF8.GetBytes(value));
        }

        public static string DeserializeString(byte[] byteArray, ref int offset)
        {
            uint length = DeserializeU32(byteArray, ref offset);
            string value = Encoding.UTF8.GetString(byteArray, offset, (int)length);
            offset += (int)length;
            return value;
        }
    }

</div>
                </details>
            </li>
        </ul>
    </div>
</div>



<!-- Video Gallery with Anchor -->
<div id="game" style="display: flex; align-items: center; margin: 2rem 0;">
    The game is based on <span href="https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe" style="color:#007bff;">Ultimate Tic Tac Toe</span>
  <div style="flex: 1 1 48%; min-width: 300px; border-radius: 8px; overflow: hidden; background: rgb(26, 26, 26);">
  </div>
</div>
</div>

<!-- Footer -->
<div style="border-top: 1px solid rgb(26, 26, 26); margin-top: 3rem; padding-top: 1rem; color: #fff;">
⚠️ Note: Click any section title in the summary to jump directly to that content. Replace demo videos with actual MP4 files.
</div>