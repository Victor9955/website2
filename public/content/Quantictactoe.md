<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction</a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Gameplay </a>
<a href="#steam" style="color: #007bff; text-decoration: none; margin: 0 10px;">👨‍💻 Custom Netcode</a>
<a href="#lesson" style="color: #007bff; text-decoration: none; margin: 0 10px;">📌 Lessons Learned </a>

</div>

<span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Publishing: End of May 2025</span>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: flex-start; gap: 2rem; margin: 2rem 0; max-width: 1200px; margin-left: auto; margin-right: auto;">
    <div style="flex: 1; padding: 0 15px; color: #fff; text-align: justify; line-height: 1.6; max-width: 600px;">
        <h2 style="font-size: 2rem; color: #007bff; margin-bottom: 1.5rem;">🌟 Introduction</h2>
        <p style="margin-bottom: 1.2rem;">
            Quantictactoe is a personal project I developed after completing an intensive one-month class on multiplayer game development (learn more about this class in the Space Multiplayer project). Inspired by the classic game of Tic-Tac-Toe, I aimed to create a more complex and strategic multiplayer experience by introducing a layered 3x3 grid system and integrating it with Steamworks for online play.
        </p>
        <p style="margin-bottom: 1.2rem;">
            Using Unity and Facepunch, I implemented advanced features such as Steam lobby creation, socket-based server-client communication, and data serialization. Notably, I created my own custom netcode using Steam Datagram Relay (SDR) instead of relying on pre-built solutions like Netcode for GameObjects, which allowed me to gain a deeper understanding of low-level networking.
        </p>
        <p>
            This project not only solidified my understanding of multiplayer systems but also allowed me to explore a different API such as Steamworks (on previous projects I used Enet or winsock).
        </p>
    </div>
    <img src="https://i.imgur.com/xkBMExc.jpeg" 
         alt="Featured Concept Art" 
         style="max-width: 500px; width: 100%; height: auto; border-radius: 8px; object-fit: cover; align-self: center;">
</div>


<div id="game" style="margin: 4rem auto; max-width: 1200px; padding: 0 1rem;">
    <div style="color: #fff; text-align: justify; line-height: 1.6;">
        <h2 style="font-size: 2rem; color: #007bff; margin-bottom: 1.5rem;">👾 Gameplay</h2>
        <p style="margin-bottom: 1.2rem;">
            The game is based on Ultimate Tic-Tac-Toe, a strategic twist on the classic game, played on a 3x3 grid of smaller 3x3 grids. Players take turns placing their marks (X or O), with the first move allowed anywhere. Each subsequent move is determined by the previous one—the small grid you play in corresponds to the position of the last move within its grid.
        </p>
        <p style="margin-bottom: 1.2rem;">
            If a player wins a small grid, it’s claimed, and the next time that grid is targeted, the player can place their mark anywhere.
        </p>
        <p>
            The goal is to win three small grids in a row, column, or diagonal on the larger grid. This game combines tactical depth and foresight, making it a challenging and engaging experience.
        </p>
    </div>
</div>
<div id="steam" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👨‍💻 Custom Netcode</h2>
        <ul style="font-size: 120%;">
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Player Connection</span>
                <p style="margin-bottom: 1.2rem;">
                    Each player when launching the game create a friends only lobby. Then when the player join a lobby it create or join the steam socket server based on who is the host. The host's SteamId is used as the "key" to connect to the socket server.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/4TVF003.png" alt="Network Diagram" 
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
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
        </div>
        </li>
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Lobbies</span>
                <p style="margin-bottom: 1.2rem;">
                    I used Facepunch API to make different kind of lobbies such as when a friend only or public lobbies.
                </p>
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
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
        </div>
        </li>
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Socket Server</span>
                <p style="margin-bottom: 1.2rem;">
                    This class handles the server-side logic that manage player connections, player data, and game states using Steamworks networking. It implements the `ISocketManager` interface to handle events like connecting, disconnecting, and receiving messages.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/LAyZkoc.png" alt="Network Diagram" 
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        SteamSocketServer.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CreateAssetMenu(fileName = "SteamSocketServer", menuName = "ScriptableObjects/SteamSocketServer", order = 1)]
    public class SteamSocketServer : ScriptableObject, ISocketManager
    {
        [SerializeField] float waitBeforeStart = 3f;
        private int _globalPlayerCount;
        private Awaitable _countdown;
        private CancellationTokenSource _cts = new();

        private Dictionary<Connection, PlayerData> _players = new();
        private List<SmallGrid> _bigGrid = new();
        private int _currentPlayer;
        private bool _waitForAllType;
        private int _bigGridCursor;

        public void ResetPlayers() => _players.Clear();

        public void OnConnecting(Connection connection, ConnectionInfo info)
        {
            connection.Accept();
            Debug.Log("Client Try To Connect");
        }

        public void OnConnected(Connection connection, ConnectionInfo info)
        {
            Debug.Log("Client is Connected");

            var playerData = new PlayerData
            {
                connection = connection,
                steamId = info.Identity.SteamId,
                playerNum = _globalPlayerCount++
            };

            _players.Add(connection, playerData);

            if (_players.Count == SteamManager.instance.maxPlayer)
            {
                InitializeGame();
                BroadcastToAll(new LoadScene(2));
            }
        }

        private void InitializeGame()
        {
            _globalPlayerCount = 0;
            _bigGrid = Enumerable.Range(0, 9).Select(_ => new SmallGrid()).ToList();
            _waitForAllType = true;
            _cts?.Cancel();
            _cts = new CancellationTokenSource();
        }

        public void OnDisconnected(Connection connection, ConnectionInfo info)
        {
            connection.Close();
            _players.Remove(connection);
            Debug.Log("Client Disconnected");
        }

        public void OnMessage(Connection connection, NetIdentity identity, IntPtr data, int size, long messageNum, long recvTime, int channel)
        {
            var byteArray = new byte[size];
            Marshal.Copy(data, byteArray, 0, size);
            HandlePacket(connection, byteArray);
        }

        private void HandlePacket(Connection connection, byte[] data)
        {
            var offset = 0;
            var opcode = (Opcode)Serialization.DeserializeU16(data, ref offset);

            switch (opcode)
            {
                case Opcode.Ready:
                    HandleReady(connection);
                    break;
                case Opcode.CancelReady:
                    HandleCancelReady(connection);
                    break;
                case Opcode.Play:
                    HandlePlay(connection, data, ref offset);
                    break;
            }
        }

        private void HandleReady(Connection connection)
        {
            if (!_players.TryGetValue(connection, out PlayerData player)) return;

            player.isReady = true;
            BroadcastToAll(new Ready(player.playerNum));
            CheckToStart();
        }

        private void HandleCancelReady(Connection connection)
        {
            if (!_players.TryGetValue(connection, out PlayerData player)) return;

            player.isReady = false;
            BroadcastToAll(new CancelReady(player.playerNum));
            CheckToStart();
        }

        private void HandlePlay(Connection connection, byte[] data, ref int offset)
        {
            if (!_players.TryGetValue(connection, out PlayerData player)) return;

            PlayClient playTurnPacket = PlayClient.Deserialize<PlayClient>(data, ref offset);
            HandleTurnPacket(player, playTurnPacket.pos, playTurnPacket.bigPos);
        }

        private async void CheckToStart()
        {
            if (_players.Values.Count(p => p.isReady) == SteamManager.instance.maxPlayer)
            {
                await WaitBegin();
            }
        }

        private async Awaitable WaitBegin()
        {
            await Awaitable.WaitForSecondsAsync(waitBeforeStart);
            _currentPlayer = UnityEngine.Random.Range(0, 2);
            foreach (Connection connection in _players.Keys)
            {
                PacketBuilder.SendPacket(new InitGame(_currentPlayer, _players[connection].playerNum), connection, SendType.Reliable);
            }
            _countdown = CountDown();
            await _countdown;
        }

        private async Awaitable CountDown()
        {
            while (!_cts.IsCancellationRequested)
            {
                await Awaitable.NextFrameAsync();

                PlayerData currentPlayer = _players.Values.FirstOrDefault(p => p.playerNum == _currentPlayer);
                if (currentPlayer == null) continue;

                currentPlayer.time -= Time.deltaTime;
                BroadcastToAll(new TimePacket(_currentPlayer, currentPlayer.time));

                if (currentPlayer.time <= 0f)
                {
                    HandleTimeout(currentPlayer);
                    break;
                }
            }
        }

        private void HandleTimeout(PlayerData timedOutPlayer)
        {
            foreach (var connection in _players.Keys)
            {
                var scene = _players[connection].playerNum == timedOutPlayer.playerNum ? 4 : 3;
                PacketBuilder.SendPacket(new LoadScene(scene), connection, SendType.Reliable);
            }
            ResetGameState();
        }

        private void HandleTurnPacket(PlayerData player, int pos, int bigPos)
        {
            if (player.playerNum != _currentPlayer) return;

            if (_waitForAllType)
            {
                _waitForAllType = false;
                _bigGridCursor = bigPos;
            }

            UpdateGameState(player, pos);
            CheckWinConditions(player);
            UpdateNextTurn(player, pos);
        }

        private void UpdateGameState(PlayerData player, int pos)
        {
            _bigGrid[_bigGridCursor].cells[pos] = player.playerNum;
            _bigGrid[_bigGridCursor].win = CheckWin(_bigGrid[_bigGridCursor].cells);

            BroadcastToAll(new PlayTurn(player.playerNum, pos, _bigGridCursor, player.time, player.time));
        }

        private void CheckWinConditions(PlayerData player)
        {
            if (_bigGrid[_bigGridCursor].win == -1) return;

            BroadcastToAll(new SmallWin(player.playerNum, _bigGridCursor));

            var bigWin = _bigGrid.Select(sg => sg.win).ToList();
            int bigWinResult = CheckWin(bigWin);

            if (bigWinResult != -1)
            {
                HandleGameEnd(bigWinResult);
            }
            else if (bigWin.All(num => num != -1))
            {
                BroadcastToAll(new LoadScene(5));
            }
        }

        private void UpdateNextTurn(PlayerData player, int pos)
        {
            _bigGridCursor = pos;
            _currentPlayer = 1 - _currentPlayer;

            if (_bigGrid[_bigGridCursor].win != -1)
            {
                _waitForAllType = true;
                BroadcastToAllExcept(new ActivateAll(), player.playerNum);
            }
            else
            {
                BroadcastToAllExcept(new ActivateSpecified(_bigGridCursor), player.playerNum);
            }
        }

        private void HandleGameEnd(int winner)
        {
            _cts.Cancel();
            foreach (Connection connection in _players.Keys)
            {
                var scene = _players[connection].playerNum == winner ? 3 : 4;
                PacketBuilder.SendPacket(new LoadScene(scene), connection, SendType.Reliable);
            }
            ResetGameState();
        }

        private void ResetGameState()
        {
            _cts.Cancel();
            _players.Clear();
            _bigGrid.Clear();
        }

        private void BroadcastToAll<T>(T packet) where T : Packet<Opcode>
        {
            foreach (Connection connection in _players.Keys)
            {
                PacketBuilder.SendPacket(packet, connection, SendType.Reliable);
            }
        }

        private void BroadcastToAllExcept<T>(T packet, int exceptPlayer) where T : Packet<Opcode>
        {
            foreach (PlayerData player in _players.Values.Where(p => p.playerNum != exceptPlayer))
            {
                PacketBuilder.SendPacket(packet, player.connection, SendType.Reliable);
            }
        }

        public int CheckWin(List<int> board)
        {
            if (CheckPlayerWin(board, 0)) return 0;
            if (CheckPlayerWin(board, 1)) return 1;
            return -1;
        }

        private bool CheckPlayerWin(List<int> board, int player)
        {
            for (int i = 0; i < 3; i++)
            {
                if (board[i * 3] == player && board[i * 3 + 1] == player && board[i * 3 + 2] == player)
                    return true;
            }

            for (int i = 0; i < 3; i++)
            {
                if (board[i] == player && board[i + 3] == player && board[i + 6] == player)
                    return true;
            }

            if (board[0] == player && board[4] == player && board[8] == player)
                return true;

            if (board[2] == player && board[4] == player && board[6] == player)
                return true;

            return false;
        }

        private class SmallGrid
        {
            public int win = -1;
            public readonly List<int> cells = Enumerable.Repeat(-1, 9).ToList();
        }
    }

</div>
        </div>
        </li>
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Steam Socket Client</span>
                <p style="margin-bottom: 1.2rem;">
                    This class handles the client-side logic that react to the servers packets, it is made the same way the server ScriptableObject is.
                    I realised that a lot of objects need to react to the servers packets so each packet have a C# event that can be bined if you have the reference to that ScriptableObjcet this is good because it is absctracted from the scene.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/mcQAtKk.png" alt="Network Diagram" 
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        SteamSocketClient.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    [CreateAssetMenu(fileName = "SteamSocketClient", menuName = "ScriptableObjects/SteamSocketClient", order = 1)]
    public class SteamSocketClient : ScriptableObject, IConnectionManager
    {
        public int firstTurn = -1;
        public int playerNum = 0;

        public event Action<PlayTurn> playTurn;
        public event Action activateAll;
        public event Action<int> activateSpecified;
        public event Action<SmallWin> smallWin;
        public event Action<TimePacket> timeUpdate;

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
                    playTurn?.Invoke(playTurnPacket);
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
                    smallWin?.Invoke(smallWinPacket);
                    break;
                case Opcode.Time:
                    TimePacket timePacket = TimePacket.Deserialize<TimePacket>(byteArray, ref offset);
                    timeUpdate?.Invoke(timePacket);
                    break;

            }
        }
    }

</div>
        </div>
        </li>
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

<div id="lesson" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; padding: 0 15px; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">📌 Lessons Learned</h2>
        <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            <li>Learned <b style="color: #ff0000;">NOT</b> to use reflexion to make Packet class because it is slow (even if this is a turnbased game)</li>
            <li>Learned to create custom netcode using Steamworks as a base</li>
            <li>Learned to work with limited documentation</li>
            <li>Developed self-sufficiency by working on a project outside my curriculum</li>
        </ul>
    </div>
</div>