<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction </a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Gameplay </a>
<a href="#tools" style="color: #007bff; text-decoration: none; margin: 0 10px;">🛠️ Tools </a>
<a href="#lesson" style="color: #007bff; text-decoration: none; margin: 0 10px;">📌 Lessons Learned </a>

</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🌟 Introduction</h2>
        <p>
            Twice Upon a Time is a 2D local multiplayer platformer developed as a six-month school project. Tasked with creating a vertical slice, my team and we made a narrative-driven experience centered on a brother and sister interacting with a book. The gameplay blends cooperative puzzles—such as manipulating book tabs and rotating wheels and platformer movement. While the narrative does not directly affect gameplay, the duo’s playful banter and discoveries deepen immersion, framing their journey through the book’s imaginative world.
        </p>
    </div>
    <img src="https://i.imgur.com/dNOutQa.png" 
         alt="Featured Concept Art" 
         style="margin-left: 12px;">
</div>


<div id="game" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👾 Gameplay</h2>
        <p>
            Twice Upon a Time is a chill and cooperative two-player narrative platformer game.
            In a broken family, a brother and sister find shelter in a book, explore with them a story shaped by their imagination and fantasies.
        </p>
        <p>
            <p style="margin-bottom: 1.2rem;">
                 On this project I developped :
            <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            <li>Interface-based interaction system</li>
            <li>World interactions</li>
            <li>State machine-based platformer movement</li>
            <li>Custom animation system</li>
            <li>Skin system </li>
            <li>Camera system</li>
        </ul>
        </p>
    </div>
</div>


<div id="tools" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">🛠️ Tools</h2>
        <p>
            As part of this project the teacher gave us the task to make tools for the game designer. I contributed to creating custom tools to streamline workflows in Unity. Key implementations included:
        </p>
        <ul style="margin-top: 0.5rem;">
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Camera View Gizmos:</strong> Visual debugging tools to enhance camera system visualization
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            CameraGizmoDrawer.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [ExecuteInEditMode]
    public class CameraGizmoDrawer : MonoBehaviour {
        public Color frustumColor = Color.cyan;
        public float size = 0.3f;
        
        void OnDrawGizmos() {
            Gizmos.color = frustumColor;
            Gizmos.matrix = transform.localToWorldMatrix;
            Gizmos.DrawFrustum(Vector3.zero, 60f, size, 0.1f, 1f);
        }
    }

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/wylx2ky.jpeg" 
                         style="float: right; margin: 0 0 20px 20px; width: 60%; height: 60%; border-radius: 10px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Component Linkers Based on Interface Implementation:</strong> Automated component retrieval for specific interfaces
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            InterfaceLinker.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public static class InterfaceLinker {
        public static T FindInterface<T>() where T : class {
            MonoBehaviour[] allObjects = Object.FindObjectsOfType<MonoBehaviour>();
            foreach(MonoBehaviour obj in allObjects) {
                if(obj is T interfaceObj) {
                    return interfaceObj as T;
                }
            }
            return null;
        }
    }

</div>
                        </div>
                    </details>
                    <div style="display: flex; gap: 10px; margin: auto;">
                        <img src="https://i.imgur.com/R8vTbpv.gif" style="max-width: 100%; border-radius: 12px;">
                    </div>
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Component Custom Parameters UI:</strong> UI to better understand how to change the gameplay components
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            ParameterUIEditor.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CustomEditor(typeof(GameComponent))]
    public class ParameterUIEditor : Editor {
        public override void OnInspectorGUI() {
            serializedObject.Update();
            
            EditorGUILayout.LabelField("Custom Parameters", EditorStyles.boldLabel);
            EditorGUILayout.PropertyField(serializedObject.FindProperty("damage"));
            EditorGUILayout.PropertyField(serializedObject.FindProperty("cooldown"));
            
            serializedObject.ApplyModifiedProperties();
        }
    }

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/6Q3vO5Z.gif" style="max-width: 100%; border-radius: 12px;">
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            ParameterUIEditor.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CustomEditor(typeof(GameComponent))]
    public class ParameterUIEditor : Editor {
        public override void OnInspectorGUI() {
            serializedObject.Update();
            
            EditorGUILayout.LabelField("Custom Parameters", EditorStyles.boldLabel);
            EditorGUILayout.PropertyField(serializedObject.FindProperty("damage"));
            EditorGUILayout.PropertyField(serializedObject.FindProperty("cooldown"));
            
            serializedObject.ApplyModifiedProperties();
        }
    }

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/udv03C5.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
            <li style="margin-bottom: 1.5rem;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div>
                        <strong>Transform Snapping Tool:</strong> Transform position snapping tool with presets stored in scriptable objects
                    </div>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
                        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
                            SnapTool.cs
                        </summary>
                        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class SnapTool : MonoBehaviour {
        public SnapPreset preset;
        
        public void SnapTransform() {
            transform.position = preset.RoundToGrid(transform.position);
        }
    }
    
    [CreateAssetMenu]
    public class SnapPreset : ScriptableObject {
        public float gridSize = 1f;
        
        public Vector3 RoundToGrid(Vector3 input) {
            return new Vector3(
                Mathf.Round(input.x / gridSize) * gridSize,
                Mathf.Round(input.y / gridSize) * gridSize,
                Mathf.Round(input.z / gridSize) * gridSize
            );
        }
    }

</div>
                        </div>
                    </details>
                    <img src="https://i.imgur.com/mdIcTNo.gif" style="max-width: 100%; border-radius: 12px;">
                </div>
            </li>
        </ul>
        <p>
            These tools prioritized usability for both developers and designers, enhancing efficiency in level design and system implementation.
        </p>
    </div>
</div>


<div id="network" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👨‍💻 Custom Netcode</h2>
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